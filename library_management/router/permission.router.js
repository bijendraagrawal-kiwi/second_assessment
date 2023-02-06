const express = require('express');

const permission = express.Router();
const { adminVerification } = require('../validation/validation');
const { permissionCreate, permissionDelete } = require('../controller/permissionController');

permission.post('/givepermission', adminVerification, permissionCreate);
permission.delete('/deletepermission', adminVerification, permissionDelete);
module.exports = {
  permission,
};
