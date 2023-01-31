const { addbook, deletebook } = require('../service/book.service');

const addBookController = async (req, res) => {
  try {
    const result = await addbook(req, res);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const deleteBookController = async (req, res) => {
  try {
    const result = await deletebook(req, res);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addBookController,
  deleteBookController,
};
