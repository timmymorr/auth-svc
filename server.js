require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const formatSeconds = require('./utils').formatSeconds;

const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

if (environment !== 'production') {
  app.use(logger('dev'));
}

const routes = require('./routes');

router.use('/', routes);

app.use('/api', router);

app.get('/status', (req, res) => {
  res.send(`**STATUS** auth-svc -- uptime: ${formatSeconds(process.uptime())}`)
})

app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;

