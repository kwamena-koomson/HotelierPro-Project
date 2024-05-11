const Validator = require('validatorjs'); 

// Function to perform validation using Validatorjs
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages); 
  validation.passes(() => callback(null, true)); 
  validation.fails(() => callback(validation.errors, false)); 
};

module.exports = validator; 