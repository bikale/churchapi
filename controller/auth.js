const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;

// @desc    SignUp User
// @route   Post /api/v1/login
// @access  Public
exports.signup = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }) // search database for any already existing email addresses -SD
    .then(async (user) => {
      if (user) {
        // user already exists. Cannot create this account -SD
        res.json({ success: false, data: 'Email is already in use!' });
      } else {
        // user does not already exist, begin process of creating new user. -SD
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });

        //hash the user's password -SD
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        // respond letting the front end know of the successful new account creation! -SD
        res.json({ success: false, data: 'Account created succesfully!' });
      }
    });
};

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

  //create cookie and send response
  res
    .cookie('churchtoken', token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      secure: false,
    })
    .status(200)
    .json({ success: true, token: token });
};
