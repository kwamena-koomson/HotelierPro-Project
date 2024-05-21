const express = require("express");
const router = express.Router();

const showsController = require("../controllers/shows.js");
const { saveShow } = require("../middleware/validate.js");
const { isAuthenticated } = require("../middleware/authenticate.js");

// GET Requests
router.get("/", showsController.getAllShows);

router.get("/:id", showsController.getSingleShow);

// POST or create Request
router.post("/", saveShow, isAuthenticated, showsController.createShow);

// PUT or update Request
router.put("/:id", saveShow, isAuthenticated, showsController.updateShow);

// DELETE Request
router.delete("/:id", isAuthenticated, showsController.deleteShow);

module.exports = router;
