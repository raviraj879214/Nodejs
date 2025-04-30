const express = require('express');
const router = express.Router();
const {login} = require('../controllers/LoginController');
const {verifyToken} = require('../controllers/VerifyTokenController');
const { getAllCategories, deleteCategory ,createcategory } = require('../controllers/CategoryController');

router.post('/login',login);
router.post('/verify-token',verifyToken);
router.get('/get-category',getAllCategories);

router.delete('/delete-categories/:id', deleteCategory);
router.post('/create-product',createcategory);


//category controller


module.exports = router;
