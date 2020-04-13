const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Login User
// @route   Post /api/v1/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    res.status(400).json({
      success: false,
      errMessage: 'Please provide an email and password',
    });
    return;
  }

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    res
      .status(400)
      .json({ success: false, errMessage: 'Invalid Username and Password' });
    return;
  }

  //Match user entered password to hashed password in database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res
      .status(400)
      .json({ success: false, errMessage: 'Invalid Username and Password' });
    return;
  }

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // assiging the redirect page after login by the roles

  //create cookie and send response
  res
    .cookie('token', token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      secure: false,
    })
    .status(200)
    .json({ success: true, token: token });
};
