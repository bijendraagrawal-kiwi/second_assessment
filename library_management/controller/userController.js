const { studentSignup, studentLogin, studentUpdate } = require('../service/student.service');

let result;
const signup = async (req, res) => {
  try {
    result = await studentSignup(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const login = async (req, res) => {
  try {
    result = await studentLogin(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const updatestudent = async (req, res) => {
  try {
    result = await studentUpdate(req);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  signup,
  login,
  updatestudent,
};
