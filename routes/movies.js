const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/movies.js");
const validation = require('../middleware/validate.js');

// GET Requests

router.get("/", moviesController.getAll);

router.get("/:id", moviesController.getSingle);

// POST or create Request

router.post('/', validation.saveMovie, moviesController.createMovie);

// PUT or update Request

router.put('/:id', validation.saveMovie, moviesController.updateMovie);

// DELETE Request

router.delete('/:id', moviesController.deleteMovie);

module.exports = router;