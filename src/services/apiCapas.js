const axios = require('axios');

const capas = axios.create({
    baseURL: 'https://covers.openlibrary.org/b/isbn/',
});

module.exports = {capas}