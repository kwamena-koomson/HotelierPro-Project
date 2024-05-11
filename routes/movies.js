const express = require("express"); // Import Express framework
const router = express.Router(); // Create an Express router instance

const moviesController = require("../controllers/movies.js"); // Import movies controller
const validation = require('../middleware/validate.js'); // Import validation middleware

// GET Requests
router.get("/", moviesController.getAll); // Route to get all movies
router.get("/:id", moviesController.getSingle); // Route to get a single movie by ID

// POST or create Request
router.post('/', validation.saveMovie, moviesController.createMovie); // Route to create a new movie

// PUT or update Request
router.put('/:id', validation.saveMovie, moviesController.updateMovie); // Route to update a movie by ID

// DELETE Request
router.delete('/:id', moviesController.deleteMovie); // Route to delete a movie by ID

module.exports = router; // Export the router
