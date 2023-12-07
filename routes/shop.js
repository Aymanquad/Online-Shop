const path = require('path');
const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);         // :(productId) means anything whr we name/access it using name of productId. this is provided by express . 

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/delete-cart-item' , shopController.postDeleteCartProduct);
router.post('/updatequantity-of-item' , shopController.postProductQtyUpdate);


router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;