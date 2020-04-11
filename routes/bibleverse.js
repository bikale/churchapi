const express = require('express');

const router = express.Router();

const {
  getAllBibleVerse,
  getSingleBibleVerse,
} = require('../controller/bibleverse');

router.get('/bibleverses', getAllBibleVerse);

router.get('/bibleverse/:book_id', getSingleBibleVerse);

module.exports = router;
