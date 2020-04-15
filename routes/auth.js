const express = require('express');
const router = express.Router();

const { login, signup } = require('../controller/auth');

router.post('/login', login);
router.post('/createaccount', signup);
module.exports = router;
