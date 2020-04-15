const express = require('express');

const router = express.Router();

const { authorize, protect } = require('../middleware/auth');

const { getbooks } = require('../controller/admin');

router.get('/getbooks', protect, authorize('admin'), getbooks);

module.exports = router;
