const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    id: Number,
    name: String,
    gender: String,
    culture: String,
    born: String,
    died: String,
    titles: Array,
    aliases: Array,
    father: String,
    mother: String,
    spouse: String,
    allegiances: Array,
    books: Array,
    povBooks: Array,
    tvSeries: Array,
    playedBy: Array
})

const PovCharacter = mongoose.model('PovCharacter', DataSchema)
module.exports = {PovCharacter}; 