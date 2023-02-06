const express = require('express');
const { addBookController, deleteBookController } = require('../controller/bookController');
const { adminVerification } = require('../validation/validation');

const bookRouter = express.Router();

bookRouter.post('/addbook', adminVerification, addBookController);
bookRouter.delete('/deletebook', adminVerification, deleteBookController);
module.exports = {
  bookRouter,
};
