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
    res.send(result);
  } catch (err) {
    console.log('Error', err);
    res.send(err);
  }
};

const login = async (req, res) => {
  try {
    const result = await studentLogin(req.body);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const assignBookToStudent = async (req, res) => {
  try {
    const result = await assignBook(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const submitAsignbook = async (req, res) => {
  try {
    const result = await submitBook(req);
    res.send(result);
  } catch (err) {
    res.status(404).send(err);
  }
};

const userAsignBook = async (req, res) => {
  try {
    const result = await showUserAssignedBook(req);
    res.send(result);
  } catch (err) {
    res.status(404).send(err);
  }
};

const userExpireBooks = async (req, res) => {
  try {
    const result = await showExpireBooks(req);
    res.send(result);
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
