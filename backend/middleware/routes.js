const Pokemon = require("../api/pokemon/models");


async function getPokemon(req, res, next){

    let pokemon
    try {
        pokemon = await Pokemon.findOne({ id: req.params.id });
        if(pokemon == null){
            return res.status(404).json({data : "Pokemon Not Found"});
        }
    } catch (error) {
        return res.status(500).json({data : error.message})
    }

    res.pokemon = pokemon;
    next();

}


module.exports = getPokemon;