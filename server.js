require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger/swagger.yaml');
const { formatSeconds } = require('./utils');

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, Content-Type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(logger('dev'));

const routes = require('./routes');

router.use('/', routes);

app.use('/api', router);

app.get('/status', (req, res) => {
  res.send(`**STATUS** auth-svc -- uptime: ${formatSeconds(process.uptime())}`);
});

app.listen(`${stage.port}`, () => {
  // eslint-disable-next-line no-console
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
