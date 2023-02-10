const {
  studentSignup, studentLogin, studentUpdate, studentdelete,
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

const updatestudent = async (req, res) => {
  try {
    const result = await studentUpdate(req.body);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const result = await studentdelete(req.body, res);
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
};
