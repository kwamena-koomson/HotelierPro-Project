const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {  // GET Request
  //#swagger.tags=['Movies']
  const result = await mongodb.getDatabase().db().collection('movies').find();
  result.toArray().then((movies) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  });
};

const getSingle = async (req, res) => { // GET Request
  //#swagger.tags=['Movies']
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('A valid movie ID is required to retrieve a single movie');
  }
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
  result.toArray().then((movies) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  });
};

const createMovie = async (req, res) => { // POST Request
  //#swagger.tags=['Movies']
  const movie = {
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
    rating: req.body.rating,
    duration: req.body.duration,
    plot: req.body.plot   
  };
  const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'There was an error creating the movie.');
  }
};

const updateMovie = async (req, res) => { // PUT Request
  //#swagger.tags=['Movies']
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Update operation requires a valid movie ID.');
  }
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
    rating: req.body.rating,
    duration: req.body.duration,
    plot: req.body.plot   
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .replaceOne({ _id: movieId }, movie);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.');
  }
};

const deleteMovie = async (req, res) => { // DELETE Request
  //#swagger.tags=['Movies']
  if(!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must have a valid movie id to delete a movie');
  }
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .deleteOne({ _id: movieId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};