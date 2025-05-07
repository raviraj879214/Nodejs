// db/mongo.js
const mongoose = require('mongoose');

const connectMongoDB = async () => {
  const url ="mongodb+srv://ravirajalphainfo:z3ktajRmpVBkzVyA@cluster0.wljvwi1.mongodb.net/ecommerce";
   //const url ="mongodb://localhost:27017/ecommerce";



  try {
    await mongoose.connect(`${url}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

module.exports = connectMongoDB;
