const express = require('express');

const subAdmin = express.Router();
const { createSubAdminController, loginSubAdmin } = require('../controller/subAdminController');
const { adminVerification } = require('../validation/validation');

subAdmin.post('/creatSubAdmin', adminVerification, createSubAdminController);
subAdmin.get('/loginsubadmin', loginSubAdmin);
module.exports = {
  subAdmin,
};
