const express = require("express");
const router = express.Router();

const premiumShowsController = require("../controllers/shows.js");
const { savePremiumShow } = require("../middleware/validate.js"); 
const { isAuthenticated } = require("../middleware/authenticate.js");

// GET Requests
router.get("/", premiumShowsController.getAllPremiumShows);

router.get("/:id", premiumShowsController.getSinglePremiumShow);

// POST or create Request
router.post("/", savePremiumShow, isAuthenticated, premiumShowsController.createPremiumShow); 

// PUT or update Request
router.put("/:id", savePremiumShow, isAuthenticated, premiumShowsController.updatePremiumShow); 

// DELETE Request
router.delete("/:id", isAuthenticated, premiumShowsController.deletePremiumShow);

module.exports = router;
