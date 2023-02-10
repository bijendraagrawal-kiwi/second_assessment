require('dotenv').config();
const express = require('express');
require('./connection/connection');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const { userRouter } = require('./router/user.router');
const { subAdmin } = require('./router/sub.admin.router');
const { bookRouter } = require('./router/book.router');
const { permission } = require('./router/permission.router');

const swaggerDocs = YAML.load('./api.yaml');
const app = express();

app.set('view engine', 'ejs');

app.use('/librarymanagement', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(subAdmin);
app.use(bookRouter);
app.use(permission);

module.exports = {
  app,
};
