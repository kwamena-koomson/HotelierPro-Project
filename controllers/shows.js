const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllShows = async (req, res) => {
  //#swagger.tags=['Shows']
  const result = await mongodb.getDatabase().db().collection('shows').find();
  result.toArray().then((shows) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shows);
  });
};

const getSingleShow = async (req, res) => {
  //#swagger.tags=['Shows']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid showid to get a single show');
  }
  const showId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('shows').find({ _id: showId });
  result.toArray().then((shows) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(shows);
  });
};

const createShow = async (req, res) => {
  //#swagger.tags=['Shows']
  const show = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    genre: req.body.genre,
    IDMb_Rating: req.body.IDMb_Rating,
    cast: req.body.cast,
    country: req.body.country,
    Seasons: req.body.Seasons,   
  };
  const response = await mongodb.getDatabase().db().collection('shows').insertOne(show);
  if (response.acknowledged) {
    res.status(201).send(); 
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the show.');
  }
};

const updateShow = async (req, res) => {
  //#swagger.tags=['Shows']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid showid to update a show');
  }
  const showId = new ObjectId(req.params.id);
  const show = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    genre: req.body.genre,
    IDMb_Rating: req.body.IDMb_Rating,
    cast: req.body.cast,
    country: req.body.country,
    Seasons: req.body.Seasons,    
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('shows')
    .replaceOne({ _id: showId }, show);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the show.');
  }
};

const deleteShow = async (req, res) => {
  //#swagger.tags=['Shows']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid showid to delete a show');
  }
  const showId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('shows')
    .deleteOne({ _id: showId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the show.');
  }
};

module.exports = {
  getAllShows,
  getSingleShow,
  createShow,
  updateShow,
  deleteShow
};
