// db/mongo.js
const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ravirajalphainfo:z3ktajRmpVBkzVyA@cluster0.wljvwi1.mongodb.net/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

module.exports = connectMongoDB;
