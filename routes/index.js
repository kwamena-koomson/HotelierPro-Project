const router = require("express").Router(); // Create an Express router instance

router.use('/', require('./swagger')); // Include Swagger documentation routes
router.get("/", (req, res) => { // Route to handle root endpoint
  //#swagger.tags=['Hi there, Nice to meet you.']
  res.send("Hi there, Nice to meet you."); // Send "Hi there, Nice to meet you." as response
});
router.use('/movies', require('./movies')); // Include movies routes

module.exports = router; // Export the router
