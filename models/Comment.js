const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    default: 'Anonymous',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
