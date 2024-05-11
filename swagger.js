const swaggerAutogen = require('swagger-autogen')(); // Import swagger-autogen library

const doc = {
    info: {
        title: 'Movies API', // Title of the API
        description: 'Movies API' // Description of the API
    },
    host: 'localhost:8888', // Host of the API
    schemes: ['http', 'https'] // Supported schemes for the API (HTTP and HTTPS)
};

const outputFile = './swagger.json'; // Output file for generated Swagger documentation
const endpointsFiles = ['./routes/index.js']; // Files containing API endpoint definitions

// Generate Swagger documentation based on endpoint files and configuration
swaggerAutogen(outputFile, endpointsFiles, doc);
