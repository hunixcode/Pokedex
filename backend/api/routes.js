const express = require("express");
const router = express.Router();

const pokemonRouter = require("./pokemon/routes");
const userRouter = require("./users/routes");
const adminRouter = require("./admin/routes");
const monthlySelectionRouter = require("./monthlySelection/routes");


router.use("/pokemon", pokemonRouter);
router.use("/users", userRouter);
router.use("/admin", adminRouter);
router.use("/monthlySelection", monthlySelectionRouter);


module.exports = router; 