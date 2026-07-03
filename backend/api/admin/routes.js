const express = require("express");
const router = express.Router();

const User = require("../users/models");
const { isAuthenticated, isAdmin } = require("../../middleware/auth");


router.get("/users", isAdmin, async (req, res) =>{
    try {
        const users = await User.find();
        res.status(200).json({data : users});
    } catch (error) {
        res.status(500).json({data : error.message});
    }
})

router.patch("/users/setAdmin/:id", isAdmin, async (req, res)=>{
    try {
        const User = await User.findById(req.params.id);
        if(User == null) {
            res.status(404).json({data : "User Not Found"});
        }
        User.role = "admin";
        await User.save();
        res.status(200).json({data : "User Is Now Admin"});

    } catch (error) {
        res.status(500).json({data : error.message});
    }
})

router.patch("/users/setNormal/:id", isAdmin, async (req, res)=>{
    try {
        const User = await User.findById(req.params.id);
        if(User == null) {
            res.status(404).json({data : "User Not Found"});
        }
        User.role = "user";
        await User.save();
        res.status(200).json({data : "User Is No More Admin"});
    } catch (error) {
        res.status(500).json({data : error.message});
    }
})

router.delete("/users/deleteUser/:id", isAdmin, async(req, res)=>{
    try {
        const User = await User.findById(req.params.id);
        if(User == null) {
            res.status(404).json({data : "User Not Found"});
        }
        await User.deleteOne();
        res.status(200).json({data : "User Deleted Successfully"})
    } catch (error) {
        res.status(500).json({data : error.message});
    }
})


module.exports = router;