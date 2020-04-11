const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bibleVerseSchema = new Schema({
  book_id: {
    type: Number,
    required: true,
  },
  book_name: {
    type: String,
    required: true,
  },
  verse: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Bibleverse', bibleVerseSchema);
