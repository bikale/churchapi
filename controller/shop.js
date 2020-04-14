const fs = require('fs');

const Shop = require('../models/Shop');

// @desc      Get All shop items
// @route     GET /api/v1/shopitems
// @access    Public

exports.getShopItems = async (req, res, next) => {
  const shopitems = await Shop.find();
  res.status(200).json({ success: true, data: shopitems });
};

// @desc      Get single shop item
// @route     GET /api/v1/shopitem/:book_id
// @access    Public

exports.getShopItem = async (req, res, next) => {
  const item_id = req.params.item_id;
  const shopitem = await Shop.findById(item_id);
  if (!shopitem) {
    res.status(404).json({ success: false, data: 'Resource not found' });
  } else {
    res.status(200).json({ success: true, data: shopitem });
  }
};
