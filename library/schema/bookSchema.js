const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  bookId: Number,
  bookName: String,
  authorName: String,
});

module.exports = mongoose.model('book', bookSchema);
