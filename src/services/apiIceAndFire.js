const axios = require('axios');

const iceAndFireBooks = axios.create({
    baseURL: 'https://anapioficeandfire.com/api/books',
});
const iceAndFireCharacters = axios.create({
    baseURL: 'https://anapioficeandfire.com/api/characters',
});

module.exports = {iceAndFireBooks, iceAndFireCharacters};