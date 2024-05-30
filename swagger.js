const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'HotelierPro API',
    description: 'This is an API for HotelierPro application, providing endpoints for managing hotels, staff, clients, and bookings.',
    version: '1.0.0'
  },
  host: 'hotel-group-cse341-s88t.onrender.com', // Adjust host based on your environment
  basePath: '/',
  schemes: ['http', 'https'], // Use http or https based on your server configuration
  securityDefinitions: {
    apiKey: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate Swagger documentation based on endpoint files and configuration
swaggerAutogen(outputFile, endpointsFiles, doc);
