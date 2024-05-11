const Validator = require('validatorjs'); // Import Validatorjs library

// Function to perform validation using Validatorjs
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages); // Create a new instance of Validatorjs
  validation.passes(() => callback(null, true)); // If validation passes, invoke the callback with success status
  validation.fails(() => callback(validation.errors, false)); // If validation fails, invoke the callback with validation errors
};

module.exports = validator; // Export the validator function
