const express = require('express');
const {povCharactersBD, bookCoversBD} = require('../controller/popularBD');
const { listPovCharacters, listPovCharacterById } = require('../controller/povCharacters');

povCharactersBD();
const route = express();

route.get('/', listPovCharacters);
route.get('/:id', listPovCharacterById);

module.exports = route;