const { addbook } = require('../service/book.service');

const addBookController = async (req, res) => {
  try {
    const result = await addbook(req, res);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addBookController,
};
