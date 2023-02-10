const book = require('../schema/bookSchema');
const { constant } = require('../constant/constant');
const { findBook } = require('../utils/student.utils');

const addbook = async (req) => {
  const { bookId, bookName, authorName } = req.body;
  const isBookPresent = await findBook(bookName, authorName);
  if (!isBookPresent) {
    const bookObject = new book({
      bookId,
      bookName,
      authorName,
    });
    const result = await bookObject.save();
    return result;
  }
  if (!isBookPresent.error) {
    return constant.BOOK_ALREADY_PRESENT;
  }
  return isBookPresent.error;
};

const deletebook = async (req) => {
  const { bookId, bookName } = req.body;
  const bookObject = await book.findOneAndDelete({ bookId, bookName });
  if (bookObject) {
    return constant.BOOK_DELETE_SUCCESSFULLY;
  }
  return constant.NOTHING_FOR_DELETE;
};

module.exports = {
  addbook,
  deletebook,
};
