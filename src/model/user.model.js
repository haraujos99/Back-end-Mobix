const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    userName: String,
    password: String
})

const User = mongoose.model('User', DataSchema) // falando pro mongoose criar um model usuario atraves dos campos do DataSchema
module.exports = User; 