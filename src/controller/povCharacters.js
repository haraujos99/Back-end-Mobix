const { PovCharacter } = require("../model/povCharacter.model")

const listPovCharacters = async (req, res)=>{
    try {
        const povCharacters = await PovCharacter.find();
        return res.status(200).json(povCharacters);
        
    } catch (error) {
        return res.status(500).json(error.message)
    }

}

const listPovCharacterById = async (req, res)=>{
    try {
        const {id} = req.params
        const povCharacter = await PovCharacter.find({id});

        if(povCharacter.length === 0) {
            return res.status(404).json({"message": "Character not found"})
        }
    
        return res.status(200).json(povCharacter);
        
    } catch (error) {
        
    }
}

module.exports = {
    listPovCharacters,
    listPovCharacterById
}