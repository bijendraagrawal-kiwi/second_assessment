const {
  studentUpdate,
  studentdelete,
  createAdmin,
  adminLogin,
  bookHistory,
  addbook,
  deletebook,
  createPermission,
  deletePermission,
} = require('../service/admin.service');

const updateStudent = async (req, res) => {
  try {
    const result = await studentUpdate(req.body);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const result = await studentdelete(req.body);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const createLibraryAdmin = async (req, res) => {
  try {
    const result = await createAdmin(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.send(err);
  }
};

const libraryAdminLogin = async (req, res) => {
  try {
    const result = await adminLogin(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const showHistoryOfBook = async (req, res) => {
  try {
    const result = await bookHistory(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const addBookController = async (req, res) => {
  try {
    const result = await addbook(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const deleteBookController = async (req, res) => {
  try {
    const result = await deletebook(req);
    res.status(result.status).send(result.message);
  } catch (err) {
    res.status(404).send(err);
  }
};

const permissionCreate = async (req, res) => {
  try {
    const result = await createPermission(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const permissionDelete = async (req, res) => {
  try {
    const result = await deletePermission(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};
module.exports = {
  updateStudent,
  deleteStudent,
  createLibraryAdmin,
  libraryAdminLogin,
  showHistoryOfBook,
  addBookController,
  deleteBookController,
  permissionCreate,
  permissionDelete,
};
