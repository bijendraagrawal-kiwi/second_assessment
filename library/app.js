require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocs = YAML.load('./api.yaml');
const app = express();

app.set('view engine', 'ejs');

app.use('/librarymanagement', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

module.exports = {
  app,
};
