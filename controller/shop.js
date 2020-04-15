const fs = require('fs');

const Shop = require('../models/Shop');
const User = require('../models/User');

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
  await shopitem.populate('comments.user').execPopulate();

  if (!shopitem) {
    res.status(404).json({ success: false, data: 'Resource not found' });
  } else {
    res.status(200).json({ success: true, data: shopitem });
  }
};

// @desc      Store user comment for shop item
// @route     Post /api/v1/shopitemcomment
// @access    Public

exports.storeUserComment = async (req, res, next) => {
  const { comment, itemid } = req.body;

  const product = await Shop.findById(itemid);
  if (!product) {
    res.json({ success: true, message: 'Product doesnot exist' });
    return;
  }
  product.comments.push({ user: req.user._id, text: comment });
  await product.save().then((result) => {
    res.json({ success: true, data: result.comments });
  });
};

// @desc      Add item to the user cart
// @route     Post /api/v1/addtocart
// @access    Public

exports.addToCart = async (req, res, next) => {
  const productId = req.body.productid;
  console.log(productId, 'addToCart');
  const id = req.user._id; // Get current user id

  const currentUser = await User.findById(id);

  currentUser.addItemToCart(productId).then((result) => {
    console.log(result, 'addToCart result');
    res.json({ success: true });
  });
};

// @desc      Delete item from the user cart
// @route     Delete /api/v1//deleteCartItem
// @access    Public

exports.deleteCartItem = async (req, res, next) => {
  const productId = req.params.productid;

  const id = req.user._id;
  const currentUser = await User.findById(id);

  currentUser.deleteItemFromCart(productId).then((result) => {
    console.log(result, 'deleteCartItem');
    res.json({ success: true });
  });
};

// @desc      Get user cart list
// @route     GET /api/v1/cart
// @access    Public

exports.getUserCart = async (req, res, next) => {
  console.log('back');
  const id = req.user._id;
  const currentUser = await User.findById(id);
  let cartList = await currentUser
    .populate('cart.items.productId')
    .execPopulate();
  cartList = cartList.cart.items;
console.log(cartList,"getuser")
  res.json({ success: true, data: cartList });
};
