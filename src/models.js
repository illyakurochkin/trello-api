const mongoose = require('./db');

const {Schema} = mongoose;

const BoardSchema = new Schema({
  name: String,
});

BoardSchema.set('strict', false);

exports.Board = mongoose.model('Board', BoardSchema);
