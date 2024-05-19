const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllPremiumShows = async (req, res) => {
  //#swagger.tags=['PremiumShows']
  const result = await mongodb.getDatabase().db().collection('premium_shows').find();
  result.toArray().then((premiumShows) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(premiumShows);
  });
};

const getSinglePremiumShow = async (req, res) => {
  //#swagger.tags=['PremiumShows']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid showid to get a single premium show');
  }
  const showId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('premium_shows').find({ _id: showId });
  result.toArray().then((premiumShows) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(premiumShows);
  });
};

const createPremiumShow = async (req, res) => {
  //#swagger.tags=['PremiumShows']
  const premiumShow = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    genre: req.body.genre,
    IDMb_Rating: req.body.IDMb_Rating,
    cast: req.body.cast,
    country: req.body.country,
    Seasons: req.body.Seasons,   
  };
  const response = await mongodb.getDatabase().db().collection('premium_shows').insertOne(premiumShow);
  if (response.acknowledged) {
    res.status(201).send(); 
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the premium show.');
  }
};

const updatePremiumShow = async (req, res) => {
  //#swagger.tags=['PremiumShows']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid showid to update a premium show');
  }
  const showId = new ObjectId(req.params.id);
  const premiumShow = {
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
    .collection('premium_shows')
    .replaceOne({ _id: showId }, premiumShow);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the premium show.');
  }
};

const deletePremiumShow = async (req, res) => {
  //#swagger.tags=['PremiumShows']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('You must have a valid showid to delete a premium show');
  }
  const showId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('premium_shows')
    .deleteOne({ _id: showId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the premium show.');
  }
};

module.exports = {
    getAllPremiumShows,
    getSinglePremiumShow,
    createPremiumShow,
    updatePremiumShow,
    deletePremiumShow
};