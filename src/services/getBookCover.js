// const XMLHttpRequest = require('xhr2');
// const FileReader = require('filereader');

// function toDataURL(url, callback) {

//     var xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//       var reader = new FileReader();
//       reader.onloadend = function() {
//         callback(reader.result);
//       }
//       reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
//   }

// toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', 
// function(dataUrl) {
//     console.log('RESULT:', dataUrl)
// })

const imageToBase64 = require('image-to-base64');

function getBookCover(isbn) {
  return imageToBase64(`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`) // Image URL
    .then(
      (response) => {
        //   const bookWithCover = {
        //     id: book.id,
        //     name: book.name,
        //     cover: response
        //   } 
        return response;

        //   booksInfoWithCover.push(bookWithCover);
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    )
}

module.exports = {
  getBookCover
}