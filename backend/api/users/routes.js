const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("./models");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ data: "User already exists" });
        }
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ data: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ data: err.message });
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ data: "Login successful", user: req.user.username });
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ data: err.message });
        }
        res.json({ data: "Logout successful" });
    });
});

router.get("/profile", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ data: "Not authenticated" });
    }
    res.json({ data: req.user });
});

router.put("/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ data: "Not authenticated" });
    }
    try {
        const { username, profilePhoto, favoriteType } = req.body;
        const updateData = {};
        
        // verif si l'username est déjà pris pour gérer les conflits
        if (username !== undefined && username !== req.user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ data: "Username already taken" });
            }
            updateData.username = username;
        }
        
        if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto;
        if (favoriteType !== undefined) updateData.favoriteType = favoriteType;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true }
        );
        res.json({ data: updatedUser });
    } catch (err) {
        res.status(500).json({ data: err.message });
    }
});

module.exports = router;
