const fs = require('fs');

const BibleVerse = require('../models/Bibleverse');

// @desc      Get All Bible verse
// @route     GET /api/v1/bibleverse
// @access    Public

exports.getAllBibleVerse = async (req, res, next) => {

  const verses = await BibleVerse.find();
  res.status(200).json({ success: true, data: verses });
};

// @desc      Get single Bible verse
// @route     GET /api/v1/bibleverse/:book_id
// @access    Public

exports.getSingleBibleVerse = async (req, res, next) => {
  const book_id = req.params.book_id;
  const verses = await BibleVerse.findOne({ book_id: book_id });
  if (!verses) {
    res.status(404).json({ success: false, data: 'Resource not found' });
  } else {
    res.status(200).json({ success: true, data: verses });
  }
};
