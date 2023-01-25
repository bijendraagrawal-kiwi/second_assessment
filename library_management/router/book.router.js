const express = require('express');
const { addBookController } = require('../controller/bookController');
const { isAdmin } = require('../middleware/admin.validator');

const bookRouter = express.Router();

bookRouter.post('/addbook', isAdmin, addBookController);

module.exports = {
  bookRouter,
};
