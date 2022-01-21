/**
 * third party libraries
 */
require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const fs = require('fs')
const morgan = require('morgan');
const path = require('path')
const router = express.Router();
const {requestLog} = require('./services/logger');
/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const auth = require('./policies/auth.policy');

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;


/**
 * express application
 */
const app = express();
const server = http.Server(app);

/**
 * Api Doc - Swagger
 */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swOptions = {
  customCss: '.swagger-ui .topbar { display: none }'
};

/**
 * Routes mapping
 */
const mappedProtectedRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');
const mappedAuthRoutes = mapRoutes(config.privateRoutes, 'api/controllers/');
const mappedOpenRoutes = mapRoutes(config.openRoutes, 'api/controllers/');
const mappedOpenRoutesReports = mapRoutes(config.reportRoutes, 'api/controllers/reportController/');
const mappedMlmRoutes = mapRoutes(config.mlmRoutes, 'api/controllers/mlm2010/');

const DB = dbService(environment, config.migrate).start();


/**
 * Morgan Logging
 */

app.use(morgan('dev'));

/**
 * Allow Cors
 */
app.use(cors());

// secure express app
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
  noSniff: true,
}));

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Logging request to AWS CloudWatch
app.use(( req, res, next) => {
    requestLog(req,res);
     next()      
})


// secure your private routes with jwt authentication middleware

app.all('/api/v.1/*', (req, res, next) => auth(req, res, next));


// fill routes for express application
app.use('/api/v.1', mappedProtectedRoutes);
app.use('/api/auth', mappedAuthRoutes);
app.use('/api/open', mappedOpenRoutes);
app.use('/api/report', mappedOpenRoutesReports);
app.use('/api/mlm2010', mappedMlmRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swOptions));


server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});

