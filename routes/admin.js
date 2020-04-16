const express = require('express');

const router = express.Router();

const { authorize, protect } = require('../middleware/auth');

const {
  getbooks,
  addbook,
  getbook,
  deletsinglebook,
} = require('../controller/admin');

router.get('/getbooks', protect, authorize('admin'), getbooks);

router.post('/addbook', protect, authorize('admin'), addbook);

router.get('/getsingle/:id', protect, authorize('admin'), getbook);

router.delete('/deletbook/:id', protect, authorize('admin'), deletsinglebook);

module.exports = router;
