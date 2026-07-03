const express = require("express");
const router = express.Router();

const getPokemon = require("../../middleware/routes");
const { isAdmin, isAuthenticated } = require("../../middleware/auth");

const MonthlySelection = require("./models");
const Pokemon = require("../pokemon/models");

router.get("/", async (req, res) => {
    try {
        const selections = await MonthlySelection.find().sort({ year: -1, createdAt: -1 });
        res.status(200).json({ data: selections });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:month/:year", async (req, res) => {
    try {
        const { month, year } = req.params;
        const selection = await MonthlySelection.findOne({ 
            month: month.charAt(0).toUpperCase() + month.slice(1).toLowerCase(),
            year: parseInt(year)
        });
        
        if (!selection) {
            return res.status(404).json({ error: "Monthly selection not found" });
        }
        
        res.status(200).json({ data: selection });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/active", async (req, res) => {
    try {
        const selection = await MonthlySelection.findOne({ active: true });
        
        if (!selection) {
            return res.status(404).json({ error: "No active monthly selection" });
        }
        
        res.status(200).json({ data: selection });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/current", async (req, res) => {
    try {
        const now = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        const selection = await MonthlySelection.findOne({
            month: monthNames[now.getMonth()],
            year: now.getFullYear()
        });
        
        if (!selection) {
            return res.status(404).json({ error: "No selection for current month" });
        }
        
        res.status(200).json({ data: selection });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const canAdd = await MonthlySelection.canAddNewMonth();
        if (!canAdd) {
            return res.status(400).json({ 
                error: "Maximum of 12 monthly selections reached. Delete an old one first." 
            });
        }

        const now = new Date();
        const month = getMonthName(now.getMonth());
        const year = now.getFullYear();
        
        const featured_type = await getRandomType();
        
        const pokemons = await Promise.all([
            getRandPokemon(featured_type),
            getRandPokemon(featured_type),
            getRandPokemon(featured_type)
        ]);
        
        const selection = new MonthlySelection({
            month,
            year,
            featured_type,
            featured_pokemons: pokemons,
            active: true
        });
        
        await selection.save();
        res.status(201).json({ data: selection });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                error: "A selection for this month and year already exists" 
            });
        }
        res.status(500).json({ error: error.message });
    }
});

router.post("/:type", isAuthenticated, isAdmin, async (req, res)=>{
    const type = req.params.type;
    try {
        const canAdd = await MonthlySelection.canAddNewMonth();
        if (!canAdd) {
            return res.status(400).json({ 
                error: "Maximum of 12 monthly selections reached. Delete an old one first." 
            });
        }

        const now = new Date();
        const month = getMonthName(now.getMonth());
        const year = now.getFullYear();
        
        const featured_type = type;
        
        const pokemons = await Promise.all([
            getRandPokemon(featured_type),
            getRandPokemon(featured_type),
            getRandPokemon(featured_type)
        ]);
        
        const selection = new MonthlySelection({
            month,
            year,
            featured_type,
            featured_pokemons: pokemons,
            active: true
        });
        
        await selection.save();
        res.status(201).json({ data: selection });
    } catch (error) {
        res.status(500).json({data: error.message});
    }
})

router.put("/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { featured_pokemons, featured_type } = req.body;
        
        const updateData = {};
        if (featured_pokemons) updateData.featured_pokemons = featured_pokemons;
        if (featured_type) updateData.featured_type = featured_type;
        
        const selection = await MonthlySelection.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!selection) {
            return res.status(404).json({ error: "Monthly selection not found" });
        }
        
        res.status(200).json({ data: selection });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:id/activate", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const selection = await MonthlySelection.setActive(req.params.id);
        
        if (!selection) {
            return res.status(404).json({ error: "Monthly selection not found" });
        }
        
        res.status(200).json({ data: selection, message: "Monthly selection activated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const selection = await MonthlySelection.findByIdAndDelete(req.params.id);
        
        if (!selection) {
            return res.status(404).json({ error: "Monthly selection not found" });
        }
        
        res.status(200).json({ message: "Monthly selection deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function getRandPokemon(type = null) {
    try {
        let query = {};
        if (type) {
            query.types = type;
        }
        
        const count = await Pokemon.countDocuments(query);
        if (count === 0) {
            throw new Error(`No pokemon found${type ? ` with type ${type}` : ''}`);
        }
        
        const random = Math.floor(Math.random() * count);
        const pokemon = await Pokemon.findOne(query).skip(random);
        return pokemon.id;
    } catch (error) {
        throw new Error(`Error fetching random pokemon: ${error.message}`);
    }
}

function getMonthName(monthNumber) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber];
}

async function getRandomType() {
    try {
        const types = await Pokemon.distinct("types");
        
        if (types.length === 0) {
            throw new Error("No pokemon types found in database");
        }
        
        return types[Math.floor(Math.random() * types.length)];
    } catch (error) {
        throw new Error(`Error fetching random type: ${error.message}`);
    }
}

module.exports = router;