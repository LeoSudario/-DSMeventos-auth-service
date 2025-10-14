const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DSMeventos Auth Service API',
      version: '1.0.0',
      description: 'Authentication microservice for DSMeventos'
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRoutes)

app.get('/',(req, res) => {
    res.json({
        service: 'DSMeventos Auth Service',
        status: 'Running',
        endpoints:{
            register:'POST /auth/register',
            documentation:'GET /api-docs'
        }
    })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
})