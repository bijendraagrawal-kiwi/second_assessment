const mongoose = require('mongoose');
const { studentModel } = require('./studentSchema');

const permissionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: studentModel,
  },
  permissionType: String,
});

const permissionModel = mongoose.model('permission', permissionSchema);
module.exports = permissionModel;
