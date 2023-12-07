const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();                         //basically , using this to route our stuff throu files.

// /add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /products => GET
router.get('/admin-products', adminController.getProducts);

// /add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId' , adminController.getEditProduct);

router.post('/edit-product' , adminController.postEditProduct);

router.post('/delete-product' , adminController.postDeleteProduct);

module.exports = router;
