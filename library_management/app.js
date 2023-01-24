require('dotenv').config();

const express = require('express');
require('./connection/connection');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT);
