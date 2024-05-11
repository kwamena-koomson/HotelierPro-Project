const validator = require('../helpers/validate'); 

// Middleware function to validate movie data before saving
const saveMovie = (req, res, next) => {
    const validationRule = {
      title: 'required|string', 
      release_date: 'required|string', 
      genre: 'required|string', 
      director: 'required|string' 
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
    saveMovie 
  };
