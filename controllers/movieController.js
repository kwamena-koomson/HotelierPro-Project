// movieController.js

const Movie = require('./models/Movie');

// Controller functions

// GET all movies
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST add a new movie
const addMovie = async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        genre: req.body.genre,
        year: req.body.year,
        rating: req.body.rating,
        duration: req.body.duration,
        plot: req.body.plot
    });
    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getAllMovies,
    addMovie
};
