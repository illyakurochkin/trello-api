const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect('<db-url>', connectionOptions);

module.exports = mongoose;
