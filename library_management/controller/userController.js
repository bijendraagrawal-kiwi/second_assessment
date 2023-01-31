const {
  studentLogin,
  studentSignup,
  studentUpdate,
  studentdelete,
  assignBook,
  submitBook,
  showUserAssignedBook,
  showExpireBooks,
  createAdmin,
  adminLogin,
} = require('../service/student.service');

const signup = async (req, res) => {
  try {
    const result = await studentSignup(req);
    res.send(result);
  } catch (err) {
    console.log('Error', err);
    res.send(err);
  }
};

const login = async (req, res) => {
  try {
    const result = await studentLogin(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const updatestudent = async (req, res) => {
  try {
    const result = await studentUpdate(req, res);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const result = await studentdelete(req, res);
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
    const result = await submitBook(req, res);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const userAsignBook = async (req, res) => {
  try {
    const result = await showUserAssignedBook(req, res);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const userExpireBooks = async (req, res) => {
  try {
    const result = await showExpireBooks(req, res);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const createLibraryAdmin = async (req, res) => {
  try {
    const result = await createAdmin(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const libraryAdminLogin = async (req, res) => {
  try {
    const result = await adminLogin(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  signup,
  login,
  updatestudent,
  deleteStudent,
  assignBookToStudent,
  submitAsignbook,
  userAsignBook,
  userExpireBooks,
  createLibraryAdmin,
  libraryAdminLogin,
};
