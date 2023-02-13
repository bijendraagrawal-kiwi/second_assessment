const express = require('express');

const subAdminRouter = express.Router();
const { createSubAdminController, loginSubAdmin } = require('../controller/subAdminController');
const { adminVerification } = require('../validation/validation');

subAdminRouter.post('/creatSubAdmin', adminVerification, createSubAdminController);
subAdminRouter.get('/loginsubadmin', loginSubAdmin);
module.exports = {
  subAdminRouter,
};
