const { PovCharacter } = require("../model/povCharacter.model")

const listPovCharacters = async (req, res)=>{
    const povCharacters = await PovCharacter.find();

    res.status(200).json(povCharacters);
}

const listPovCharacterById = async (req, res)=>{
    const {id} = req.params
    const povCharacter = await PovCharacter.find({id});

    res.status(200).json(povCharacter);
}

module.exports = {
    listPovCharacters,
    listPovCharacterById
}