const { studentLogin, studentSignup, studentUpdate } = require('../service/student.service');

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

module.exports = {
  signup,
  login,
  updatestudent,
};
