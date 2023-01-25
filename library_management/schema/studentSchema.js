const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  roll_number: {
    type: Number,
    default: 0,
  },
  name: String,
  contact_number: Number,
  email: String,
  address: String,
  password: String,
  isadmin: {
    type: Boolean,
    default: false,
  },
});

const studentModel = mongoose.model('student', studentSchema);
module.exports = {
  studentModel,
};
