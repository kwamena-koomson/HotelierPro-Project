const validator = require('../helpers/validate'); // Import validator helper module

// Middleware function to validate movie data before saving
const saveMovie = (req, res, next) => {
    const validationRule = {
      title: 'required|string', // Title must be a non-empty string
      release_date: 'required|string', // Release date must be a non-empty string
      genre: 'required|string', // Genre must be a non-empty string
      director: 'required|string' // Director must be a non-empty string
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) { // If validation fails
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err // Send validation errors as response
        });
      } else { // If validation passes
        next(); // Proceed to the next middleware
      }
    });
  };
  
  module.exports = {
    saveMovie // Export the middleware function
  };
