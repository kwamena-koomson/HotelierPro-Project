const swaggerAutogen = require('swagger-autogen')(); 
const doc = {
    info: {
        title: 'Movies API', 
        description: 'Movies API' 
    },
    host: 'localhost:8888', 
    schemes: ['http', 'https'] 
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js']; 

// Generate Swagger documentation based on endpoint files and configuration
swaggerAutogen(outputFile, endpointsFiles, doc);
