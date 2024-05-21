const swaggerAutogen = require('swagger-autogen')(); 
const doc = {
    info: {
        title: 'Movies & Shows API', 
        description: 'This is an API for movies and shows' 
    },
    host: 'localhost:8888', 
    schemes: ['http', 'https'] 
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js']; 

// Generate Swagger documentation based on endpoint files and configuration
swaggerAutogen(outputFile, endpointsFiles, doc);
