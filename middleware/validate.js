const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
    const validationRule = {
      title: 'required|string',
      director: 'required|string',
      genre: 'required|string',
      year: 'required|integer',
      rating: 'required|integer',
      duration: 'required|integer',
      plot: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
};

const savePremiumShow = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    year: 'required|integer',
    director: 'required|string',
    genre: 'required|string',
    IDMb_Rating: 'required|integer',
    cast: 'required|array', 
    country: 'required|string',
    Seasons: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
  
module.exports = {
  saveMovie,
  savePremiumShow
};
