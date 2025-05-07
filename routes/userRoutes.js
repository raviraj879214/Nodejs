const express = require('express');
const router = express.Router();
const upload = require('../db/upload');





const {login} = require('../controllers/LoginController');
const {verifyToken} = require('../controllers/VerifyTokenController');
const { getAllCategories, deleteCategory ,createcategory ,categoryById,updatecreatecategory } = require('../controllers/CategoryController');
const {createProduct, getproductwithcategory, deleteproduct , productbyid , updateProduct ,getProductByUrl } = require("../controllers/ProductControllers");
const {CartCreate , cartproducts , deleteCartItem  } = require("../controllers/CartControllers"); 
const {finalOrder ,orderDetails } = require("../controllers/OrderController");





router.post('/login',login);
router.post('/verify-token',verifyToken);
router.get('/get-category',getAllCategories);


//category controller
router.delete('/delete-categories/:id', deleteCategory);
router.post('/create-product',createcategory);
router.get('/get-cat/:id',categoryById);
router.post('/update-category',updatecreatecategory);



//product controller

router.post('/create-products', upload.single('images'), createProduct);
router.get('/get-products',getproductwithcategory);
router.delete('/delete-product/:id', deleteproduct);
router.get('/get-product-id/:id',productbyid);
router.put('/update-product',upload.single('images'),updateProduct);
router.get('/get-product-url/:ProductUrl',getProductByUrl);


//cart controller
router.post('/add-cart',CartCreate);
router.get('/get-carts/:userid',cartproducts);
router.get('/delete-cart-item/:itemId',deleteCartItem);


//order controller
router.get('/order-final/:userid',finalOrder);
router.get('/get-order/:userid',orderDetails);





module.exports = router;
