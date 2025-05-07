const CartItem = require("../models/CartItem");


const mongoose = require('mongoose'); // Ensure mongoose is required if you're using it for ObjectId generation

exports.CartCreate = async (req, res) => {
  try {
    const { cartId, productId, quantity, userId } = req.body;


    // Validate required fields
    if (!productId || !quantity || !userId) {
      return res.status(400).json({ message: 'Product ID, quantity, and user ID are required' });
    }

    // Validate that quantity is a positive integer
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ message: 'Quantity must be a positive integer' });
    }

    // Check if the cart item already exists for the user and product
    const cartItem = await CartItem.findOne({ productId, userId });

    if (!cartItem) {
      // Create a new cart item if not found
      const newCartItem = new CartItem({
        cartId,
        productId,
        quantity,
        userId,
        _id: new mongoose.Types.ObjectId().toString() // Explicitly create a new _id if needed
      });
      await newCartItem.save();
      return res.status(201).json({ message: 'Cart item created successfully', cartItem: newCartItem });
    } else {
      // Update the quantity of the existing cart item
      cartItem.quantity += parseInt(quantity, 10); // Increment quantity by the specified amount
      await cartItem.save();
      return res.status(200).json({ message: 'Cart item updated successfully', cartItem });
    }
  } catch (error) {
    console.error('Error creating or updating cart item:', error);
    return res.status(500).json({ message: error.message });
  }
};






// Get all cart items for a specific user
exports.cartproducts = async (req, res) => {
  try {
    const { userid } = req.params;

    if (!userid) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch all cart items for the given user and populate the product details
    const cartItems = await CartItem.find({ userId: userid }).populate('productId');

    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json({ message: "No cart items found for this user." });
    }

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Server error while fetching cart items." });
  }
};



exports.deleteCartItem = async (req, res) => {
    const { itemId } = req.params;  // Extracting the item ID from the request parameters
  
    console.log(itemId);
    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }
   
  
    try {
      // Attempting to delete the cart item by its ID
      const result = await CartItem.deleteOne({ _id: itemId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Return a success response if the deletion was successful
      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  