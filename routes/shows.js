const express = require("express");
const router = express.Router();

const premiumShowsController = require("../controllers/shows.js");
const { savePremiumShow } = require("../middleware/validate.js"); // Importing the correct validation middleware
const { isAuthenticated } = require("../middleware/authenticate.js");

// GET Requests
router.get("/", premiumShowsController.getAllPremiumShows);

router.get("/:id", premiumShowsController.getSinglePremiumShow);

// POST or create Request
router.post("/", savePremiumShow, isAuthenticated, premiumShowsController.createPremiumShow); // Using the correct validation middleware

// PUT or update Request
router.put("/:id", savePremiumShow, isAuthenticated, premiumShowsController.updatePremiumShow); // Using the correct validation middleware

// DELETE Request
router.delete("/:id", isAuthenticated, premiumShowsController.deletePremiumShow);

module.exports = router;
