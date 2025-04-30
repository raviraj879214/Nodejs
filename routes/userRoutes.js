const express = require('express');
const router = express.Router();
const {login} = require('../controllers/LoginController');
const {verifyToken} = require('../controllers/VerifyTokenController');
const { getAllCategories, deleteCategory ,createcategory ,categoryById,updatecreatecategory } = require('../controllers/CategoryController');

router.post('/login',login);
router.post('/verify-token',verifyToken);
router.get('/get-category',getAllCategories);


//category controller
router.delete('/delete-categories/:id', deleteCategory);
router.post('/create-product',createcategory);
router.get('/get-cat/:id',categoryById);
router.post('/update-category',updatecreatecategory);


module.exports = router;
