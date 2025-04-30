const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number
}, { timestamps: true });

module.exports = mongoose.model('CartItem', cartItemSchema);
