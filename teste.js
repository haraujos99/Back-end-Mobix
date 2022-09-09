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

const response = imageToBase64("https://covers.openlibrary.org/b/isbn/978-0553103540-S.jpg") // Image URL
 
console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."