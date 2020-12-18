const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect('mongodb+srv://illyakurochkintest:NDjK8pxt8pal2gqw@cluster0-qqg0b.mongodb.net/test?retryWrites=true&w=majority', connectionOptions);

module.exports = mongoose;
