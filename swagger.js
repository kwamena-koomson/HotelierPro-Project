const swaggerAutogen = require('swagger-autogen')(); 
const doc = {
    info: {
        title: 'Movies & Shows API', 
        description: 'This is an API for movies and shows' 
    },
    host: 'cse341-p2-jvhe.onrender.com/', 
    schemes: ['http', 'https'],
    securityDefinitions: { // Add security definitions for OAuth2
      githubOAuth: {
        type: 'oauth2',
        flow: 'accessCode',
        authorizationUrl: 'https://github.com/login/oauth/authorize',
        tokenUrl: 'https://github.com/login/oauth/access_token',
        scopes: {
          read: 'Grants read access',
          write: 'Grants write access'
        }
      }
    }
};

const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js']; 

// Generate Swagger documentation based on endpoint files and configuration
swaggerAutogen(outputFile, endpointsFiles, doc);
