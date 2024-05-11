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


// This generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);