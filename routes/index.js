const router = require("express").Router(); 

router.use('/', require('./swagger')); 
router.get("/", (req, res) => { 
  //#swagger.tags=['Hi there, Nice to meet you.']
  res.send("Hi there, Nice to meet you."); // Send "Hi there, Nice to meet you." as response
});
router.use('/movies', require('./movies')); 

module.exports = router; 
