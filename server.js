/* eslint-disable no-undef */ // Disable ESLint rule for undefined variables

const express = require("express"); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser middleware for parsing JSON bodies
const mongodb = require("./data/database.js"); // Import MongoDB database module

const port = process.env.PORT || 8888; // Set port for the server, default to 8888 if not provided through environment variable
const app = express(); // Create Express application instance

app
  .use(bodyParser.json()) // Use body-parser middleware to parse JSON bodies
  .use((req, res, next) => { // Middleware to set CORS headers allowing requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes')); // Include routes from the './routes' directory

process.on('uncaughtException', (err, origin) => { // Handle uncaught exceptions
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin ${origin}`);
});

mongodb.initDb((err) => { // Initialize the MongoDB database
  if (err) { // Handle initialization errors
    console.log(err); // Log initialization error
  } else { // If initialization succeeds
    app.listen(port, () => { // Start the server and listen on the specified port
      console.log(`Database is listening and node Running on port ${port}`); // Log server startup message
    });
  }
});
