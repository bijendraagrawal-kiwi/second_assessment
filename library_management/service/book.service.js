const book = require('../schema/bookSchema');
const constant = require('../constant/constant');

let bookObject;
const addbook = async (req, res) => {
  if (res.locals.admin) {
    bookObject = new book({
      bookId: req.body.bookId,
      bookName: req.body.bookName,
      authorName: req.body.author,
    });
    const result = await bookObject.save();
    return result;
  }
  return constant.NOT_ADMIN;
};

module.exports = {
  addbook,
};
