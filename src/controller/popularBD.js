const {iceAndFireBooks, iceAndFireCharacters} = require("../services/apiIceAndFire");
const imageToBase64 = require('image-to-base64');
const { PovCharacter } = require("../model/povCharacter.model");

const booksInfo = []


const povCharactersBD = async () =>{
  const populedPovCharacterDB = await PovCharacter.find();

  if(populedPovCharacterDB.length > 0){
    console.log("DB already populed");
    return;
  }
  
  try{
    const responseBooks = await iceAndFireBooks.get('/');
    const books = responseBooks.data;

    const povCharactersIds = []
    
    books.forEach(async (book, index)=>{
      
      const actualBookInfo = {
        id: index +1,
        name: book.name,
        isbn: book.isbn
      }
      booksInfo.push(actualBookInfo);

      book.povCharacters.forEach((character) =>{
        const characterId = character.split('/');
        const registeredCharacter = povCharactersIds.find(id => id === characterId[characterId.length - 1]);

        if(!registeredCharacter){
          povCharactersIds.push(characterId[characterId.length - 1])
        }
      });
    });


    povCharactersIds.forEach(async (characterId)=>{
      const responsePovCharacters = await  iceAndFireCharacters.get(`/${characterId}`);
      const povCharacter = responsePovCharacters.data;
      const povBooks = []
      booksInfo.forEach((book)=>{
          for(let povBook of povCharacter.povBooks){
             if(book.id == povBook.split('/').reverse()[0]){
              povBooks.push(book);
             }
          }
      })

      const commonBooks = []
      booksInfo.filter((book)=>{
        for(let commonBook of povCharacter.books){
          if(book.id == commonBook.split('/').reverse()[0]){
            commonBooks.push(book);
           }
        }
      })

      const povCharacterData = {
        id: characterId,
        name: povCharacter.name,
        gender: povCharacter.gender,
        culture: povCharacter.culture,
        born: povCharacter.born,
        died: povCharacter.died,
        titles: povCharacter.titles,
        aliases: povCharacter.aliases,
        father: povCharacter.father,
        mother: povCharacter.mother,
        spouse: povCharacter.spouse,
        allegiances: povCharacter.allegiances,
        books: commonBooks,
        povBooks: povBooks,
        tvSeries: povCharacter.tvSeries,
        playedBy: povCharacter.playedBy
      }

      const povCharacterCreate = await PovCharacter.create(povCharacterData);

    })

    booksInfo.forEach((book)=>{

    })



    return console.log("DB sucessfully populed");
    
  } catch (error) {
    return res.status(500).json(error);
  }
}

const bookCoversBD = async () =>{
  const booksInfoWithCover = [];

  async function fetchImage(url) {
    const img = new Image();
    return new Promise((res, rej) => {
        img.onload = () => res(img);
        img.onerror = e => rej(e);
        img.src = url;
    });
  }
  const img = await fetchImage('https://covers.openlibrary.org/b/id/12547191-L.jpg');
  

    // booksInfo.forEach(async (book)=>{
    //   imageToBase64(`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`) // Image URL
    //   .then(
    //       (response) => {
    //           const bookWithCover = {
    //             id: book.id,
    //             name: book.name,
    //             cover: response
    //           } 
    //           console.log(response);

    //           booksInfoWithCover.push(bookWithCover);
    //       }
    //   )
    //   .catch(
    //       (error) => {
    //           console.log(error);
    //       }
    //   )
    // });

    console.log(img);
}

module.exports = {
  povCharactersBD,
  bookCoversBD
}