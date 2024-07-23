const express = require("express");
const router = express.Router();
const product_controller = require("../Controller/ProductController");
const {requiresAuth} = require("../helper");

router.post('/create',requiresAuth,product_controller.product_create);
router.get('/Productlist',requiresAuth, product_controller.product_details);
router.post('/product_update',requiresAuth, product_controller.product_update);
router.delete('/deleteproduct',requiresAuth,product_controller.deleteproduct);
router.post('/stringMatch', product_controller.stringMatch);
router.post('/testing',product_controller.testing);
router.post('/sumArray',product_controller.sumArray);
router.post('/RemoveDuplicate',product_controller.RemoveDuplicate)
router.post('/reverseString',product_controller.reverseString)

module.exports = router; 