const mongodb = require('../data/database'); // Import database module
const ObjectId = require('mongodb').ObjectId; // Import ObjectId from mongodb

// Function to get all movies
const getAll = async (req, res) => {  
  //#swagger.tags=['Movies']
  const result = await mongodb.getDatabase().db().collection('movies').find(); // Find all movies in the collection
  result.toArray().then((movies) => { // Convert the result to an array
    res.setHeader('Content-Type', 'application/json'); // Set response header
    res.status(200).json(movies); // Send JSON response with movies
  });
};

// Function to get a single movie by ID
const getSingle = async (req, res) => { 
  //#swagger.tags=['Movies']
  if(!ObjectId.isValid(req.params.id)) { // Check if movie ID is valid
    res.status(400).json('A valid movie ID is required to retrieve a single movie'); // Send error response if ID is invalid
  }
  const movieId = new ObjectId(req.params.id); // Create ObjectId from movie ID
  const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId }); // Find movie by ID
  result.toArray().then((movies) => { // Convert the result to an array
    res.setHeader('Content-Type', 'application/json'); // Set response header
    res.status(200).json(movies); // Send JSON response with movie
  });
};

// Function to create a new movie
const createMovie = async (req, res) => { 
  //#swagger.tags=['Movies']
  const movie = { // Create movie object from request body
    title: req.body.title,
    director: req.body.director,
    genre: req.body.genre,
    year: req.body.year,
    rating: req.body.rating,
    duration: req.body.duration,
    plot: req.body.plot   
  };
  const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie); // Insert movie into collection
  if (response.acknowledged) { // If insertion is successful
    res.status(204).send(); // Send success response
  } else {
    res.status(500).json(response.error || 'There was an error creating the movie.'); // Send error response if insertion fails
  }
};

// Function to update an existing movie
const updateMovie = async (req, res) => { 
  //#swagger.tags=['Movies']
  if(!ObjectId.isValid(req.params.id)) { // Check if movie ID is valid
    res.status(400).json('Update operation requires a valid movie ID.'); // Send error response if ID is invalid
  }
  const movieId = new ObjectId(req.params.id); // Create ObjectId from movie ID
  const movie = { // Create movie object from request body
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
    .replaceOne({ _id: movieId }, movie); // Replace movie with updated data
  if (response.modifiedCount > 0) { // If modification is successful
    res.status(204).send(); // Send success response
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the movie.'); // Send error response if modification fails
  }
};

// Function to delete a movie by ID
const deleteMovie = async (req, res) => { 
  //#swagger.tags=['Movies']
  if(!ObjectId.isValid(req.params.id)) { // Check if movie ID is valid
    res.status(400).json('Must have a valid movie id to delete a movie'); // Send error response if ID is invalid
  }
  const movieId = new ObjectId(req.params.id); // Create ObjectId from movie ID
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('movies')
    .deleteOne({ _id: movieId }); // Delete movie from collection
  if (response.deletedCount > 0) { // If deletion is successful
    res.status(204).send(); // Send success response
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the movie.'); // Send error response if deletion fails
  }
};

module.exports = {
  getAll, // Export getAll function to get all movies
  getSingle, // Export getSingle function to get a single movie by ID
  createMovie, // Export createMovie function to create a new movie
  updateMovie, // Export updateMovie function to update an existing movie
  deleteMovie // Export deleteMovie function to delete a movie by ID
};
