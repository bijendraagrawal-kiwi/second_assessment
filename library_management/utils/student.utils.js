const bcryptjs = require('bcryptjs');
const constant = require('../constant/constant');

const passwordEncrypt = async (userPassword) => {
  const salt = await bcryptjs.genSalt(10);
  const securePassword = await bcryptjs.hash(userPassword, salt);
  return securePassword;
};

const comparePassword = async (userPassword, bcryptPassword) => {
  const result = await bcryptjs.compare(userPassword, bcryptPassword);
  if (!result) {
    return constant.PASSWORD_NOT_MATCH;
  }
  return constant.LOGIN_SUCCESS;
};
module.exports = {
  passwordEncrypt,
  comparePassword,
};
