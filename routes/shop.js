const express = require('express');

const router = express.Router();

const { authorize, protect } = require('../middleware/auth');

const {
  getShopItems,
  getShopItem,
  storeUserComment,
  addToCart,
  deleteCartItem,
  getUserCart,
} = require('../controller/shop');

router.get('/shopitems', getShopItems);

router.get('/shopitem/:item_id', getShopItem);

router.post('/shopitemcomment', protect, storeUserComment);

router.post('/addtocart', protect, addToCart);

router.get('/cart', protect, getUserCart);

router.delete('/deletecartitem/:productid', protect, deleteCartItem);

module.exports = router;
