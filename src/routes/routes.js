const express = require('express');
const {povCharactersDB} = require('../services/fillDB');
const { listPovCharacters, listPovCharacterById } = require('../controller/povCharacters');
const { signIn, signUp } = require('../controller/user');
const { checkSignin } = require('../services/checkSignin');

povCharactersDB();
const route = express();

route.post('/singin', signIn);
route.post('/singup', signUp);

route.use(checkSignin);
route.get('/povCharacters', listPovCharacters);
route.get('/povCharacters/:id', listPovCharacterById);

module.exports = route;