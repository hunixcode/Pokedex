const mongoose = require("mongoose");


const pokemonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    types: [{
        type: String,
        required: true
    }],
    sprite: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        specialAttack: Number,
        specialDefense: Number,
        speed: Number
    }
})


module.exports = mongoose.model("Pokemon", pokemonSchema);