const fs = require('fs');

const Shop = require('../models/Shop');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
// @desc    get all books
// @route   Get /api/v1/admin/getbooks
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

// @desc    Add book
// @route   Post /api/v1/admin/addbook
// @access  Private

exports.addbook = async (req, res, next) => {
  await Shop.create({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    imageurl: req.body.imageurl,
    description: req.body.description,
    comments: [],
  })
    .then((result) => {
      res.status(201).json({ success: true, data: result });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ success: false, message: 'Not able to add a book' });
    });
};

exports.getbook = (req, res, next) => {
  Shop.findById(req.params.id)
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.deletsinglebook = (req, res, next) => {

  Shop.deleteOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      res.status(200).json({ success: true, msg: 'deleted succesfully' });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.updatebook = (req, res, next) => {

  Shop.findByIdAndUpdate(req.params.id, {
    imageurl: req.body.imageurl,
    title: req.body.title,
    author: req.body.author,
    price: +req.body.price,
    description: req.body.description,
  })
    .then((result) => {
     
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
