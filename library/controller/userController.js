const {
  studentSignup,
  studentLogin,
  assignBook,
  submitBook,
  showUserAssignedBook,
  showExpireBooks,
} = require('../service/student.service');

const signup = async (req, res) => {
  try {
    const result = await studentSignup(req.body);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const login = async (req, res) => {
  try {
    const result = await studentLogin(req.body);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const assignBookToStudent = async (req, res) => {
  try {
    const result = await assignBook(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const submitAsignbook = async (req, res) => {
  try {
    const result = await submitBook(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const userAsignBook = async (req, res) => {
  try {
    const result = await showUserAssignedBook(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const userExpireBooks = async (req, res) => {
  try {
    const result = await showExpireBooks(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = {
  signup,
  login,
  assignBookToStudent,
  submitAsignbook,
  userAsignBook,
  userExpireBooks,
};
