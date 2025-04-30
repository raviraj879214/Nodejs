const Category = require('../models/Category'); 
const mongoose = require('mongoose');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
};


const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const _id = id;
  console.log(_id);
  try
  {
    const deletedCategory = await Category.findByIdAndDelete(id);
    console.log(deletedCategory);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } 
  catch (error)
  {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error while deleting category' });
  }
};




const createcategory = async (req, res) => {
  try {
    const { Categoryname, CatURL } = req.body;

    // Validate input
    if (!Categoryname || !CatURL) {
      return res.status(400).json({
        message: "Categoryname and CatURL are required",
        data: { Categoryname, CatURL }
      });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ Categoryname });
    if (existingCategory) {
      return res.status(409).json({
        message: "Category already exists",
        data: { Categoryname, CatURL }
      });
    }
    const _id =new mongoose.Types.ObjectId();
    // Create and save the new category
    const newCategory = new Category({_id, Categoryname, CatURL });
    await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory
    });
  } catch (error) {
    console.error("Error in createCategory:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};














module.exports = {
  getAllCategories,
  deleteCategory,
  createcategory
};