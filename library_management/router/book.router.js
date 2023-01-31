const express = require('express');
const { addBookController, deleteBookController } = require('../controller/bookController');
const { isAdmin } = require('../middleware/admin.validator');

const bookRouter = express.Router();

bookRouter.post('/addbook', isAdmin, addBookController);
bookRouter.delete('/deletebook', isAdmin, deleteBookController);
module.exports = {
  bookRouter,
};
