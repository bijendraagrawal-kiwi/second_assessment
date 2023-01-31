const mongoose = require('mongoose');
const book = require('./bookSchema');

const studentSchema = mongoose.Schema({
  rollNumber: {
    type: Number,
    default: 0,
  },
  name: String,
  contact: Number,
  email: String,
  address: String,
  password: String,
  profile: {
    data: Buffer,
    contentType: String,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
  issubadmin: {
    type: Boolean,
    default: false,
  },
  asignedbook: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: book,
    },
    assignedDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: +new Date() + 7 * 24 * 60 * 60 * 1000,
    },
    submitted: {
      type: Boolean,
      default: false,
    },
  }],
});

const studentModel = mongoose.model('student', studentSchema);
module.exports = {
  studentModel,
};
