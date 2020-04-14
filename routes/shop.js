const express = require('express');

const router = express.Router();

const { getShopItems, getShopItem } = require('../controller/shop');

router.get('/shopitems', getShopItems);

router.get('/shopitem/:item_id', getShopItem);

module.exports = router;
