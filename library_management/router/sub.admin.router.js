const express = require('express');

const subAdmin = express.Router();
const { isAdminDelete } = require('../middleware/admin.validator');
const { createSubAdminController } = require('../controller/subAdminController');

subAdmin.post('/creatSubAdmin', isAdminDelete, createSubAdminController);
module.exports = {
  subAdmin,
};
