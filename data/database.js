/* eslint-disable no-undef */

const dotenv = require("dotenv"); 
dotenv.config(); 
const MongoClient = require("mongodb").MongoClient; // Import MongoClient for MongoDB connection

let database; 

// Function to initialize the database connection
const initDb = (callback) => {
  if (database) { 
    console.log("DB is already Initialized!"); 
    return callback(null, database); 
  }
  MongoClient.connect(process.env.MONGODB_URL) // Connect to MongoDB using the provided URL from environment variables
    .then((client) => {
      database = client; 
      callback(null, database); 
    })
    .catch((err) => {
      callback(err); 
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
  initDb, 
  getDatabase, 
};
