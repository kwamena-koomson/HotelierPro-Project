/* eslint-disable no-undef */
const dotenv = require("dotenv"); // Import dotenv library for environment variables
dotenv.config(); // Load environment variables from .env file
const MongoClient = require("mongodb").MongoClient; // Import MongoClient for MongoDB connection

let database; // Variable to hold the database connection

// Function to initialize the database connection
const initDb = (callback) => {
  if (database) { // If database connection exists
    console.log("DB is already Initialized!"); // Log message indicating database is already initialized
    return callback(null, database); // Invoke the callback with existing database connection
  }
  MongoClient.connect(process.env.MONGODB_URL) // Connect to MongoDB using the provided URL from environment variables
    .then((client) => {
      database = client; // Store the database connection
      callback(null, database); // Invoke the callback with database connection
    })
    .catch((err) => {
      callback(err); // If an error occurs during database connection, invoke the callback with the error
    });
};

// Function to get the database connection
const getDatabase = () => {
  if (!database) { // If database connection does not exist
    throw Error("Database not initialized"); // Throw an error indicating database is not initialized
  }
  return database; // Return the database connection
};

module.exports = {
  initDb, // Export the initDb function to initialize the database connection
  getDatabase, // Export the getDatabase function to get the database connection
};
