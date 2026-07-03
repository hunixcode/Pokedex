const express = require("express");
const router = express.Router();
const Pokemon = require("./models");
const { isAdmin } = require("../../middleware/auth");
const getPokemon = require("../../middleware/routes")


router.get("/", async (req, res)=>{
    try {
        const pokemon = await Pokemon.find();
        res.json({data : pokemon})
    } catch(err){
        res.status(500).json({data : err.message})
    }
})

router.get("/:id", getPokemon, (req, res)=>{
    res.json({data : res.pokemon})
})

router.post("/", isAdmin, async (req, res)=>{
    const pokemon = new Pokemon({
        id: req.body.id,
        name: req.body.name,
        types: req.body.types,
        sprite: req.body.sprite,
        height: req.body.height,
        weight: req.body.weight,
        stats: req.body.stats
    })
    try {
        const newPokemon = await pokemon.save();
        res.status(201).json({data : newPokemon});
    } catch(err){
        res.status(400).json({data : err.message});
    }
})

router.patch("/:id", isAdmin, getPokemon, async (req, res)=>{
    if(req.body.name != null){
        res.pokemon.name = req.body.name
    }
    if(req.body.type != null){
        res.pokemon.type = req.body.type
    }
    try {
        const updatedPokemon = await res.pokemon.save()
        res.status(200).json({data : updatedPokemon})
    } catch (error) {
        res.status(400).json({data : error.message})
    }
})

router.delete("/:id", isAdmin, getPokemon, async (req, res)=>{
    try {
        await res.pokemon.deleteOne()
        res.status(200).json({data : "Pokemon Deleted Successfully"})
    } catch (error) {
        res.status(500).json({data : error.message});
    }
})


module.exports = router;