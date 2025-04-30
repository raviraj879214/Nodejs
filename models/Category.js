const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  _id:{
    type:String,
    
  },
  Categoryname: {
    type: String,
    required: true,
    trim: true
  },
  CatURL: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
