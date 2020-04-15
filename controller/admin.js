const fs = require('fs');

const Shop = require('../models/Shop');
const User = require('../models/User');


// @desc    get all books
// @route   Post /api/v1/admin/getbooks
// @access  Private

exports.getbooks = (req, res, next) => {
    Shop.find()
      .then((result) => {
        res.status(200).json({ success: true, data: result });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  };