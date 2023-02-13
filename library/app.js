require('dotenv').config();
require('./connection/connection');
const express = require('express');
const bodyParser = require('body-parser');
const { adminRouter } = require('./router/admin.router');
const { subAdminRouter } = require('./router/sub.admin.router');
const { userRouter } = require('./router/user.router');
// const swaggerUI = require('swagger-ui-express');
// const YAML = require('yamljs');

// const swaggerDocs = YAML.load('./api.yaml');
const app = express();

app.set('view engine', 'ejs');

// app.use('/librarymanagement', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(adminRouter);
app.use(subAdminRouter);
app.use(userRouter);

module.exports = {
  app,
};
