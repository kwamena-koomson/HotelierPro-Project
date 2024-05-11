const router = require('express').Router(); // Create an Express router instance
const swaggerUi = require('swagger-ui-express'); // Import swagger-ui-express library
const swaggerDocument = require('../swagger.json'); // Import Swagger document

router.use('/api-docs', swaggerUi.serve); // Serve Swagger UI at /api-docs route
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); // Setup Swagger UI with Swagger document

module.exports = router; // Export the router
