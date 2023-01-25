const mongoose = require('mongoose');

const connection = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log(process.env.CONNECTION_ERROR_STRING, err);
    } else {
      console.log(process.env.CONNECTION_CORRECT_STRING);
    }
  });
};
module.exports = connection();
