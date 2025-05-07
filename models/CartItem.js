const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({

  cartId: { type: String },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
