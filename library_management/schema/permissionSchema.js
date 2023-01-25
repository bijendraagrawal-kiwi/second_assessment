const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
  email: String,
  permissionType: String,
});

const permissionModel = mongoose.model('permission', permissionSchema);
module.exports = permissionModel;
