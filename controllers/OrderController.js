const CartItem = require("../models/CartItem");
const OrderItem = require  ("../models/OrderItem");


exports.finalOrder = async (req, res) => {
    try {
      const { userid } = req.params;
  
      // Get all cart items for the user
      const cartItems = await CartItem.find({ userId: userid });
  
      if (cartItems.length === 0) {
        return res.status(404).json({ message: "No items found in cart" });
      }
  
      // Create order items from cart items
      const orderItems = await Promise.all(
        cartItems.map(async (item) => {
          const newOrderItem = new OrderItem({
            userId: item.userId,
            productId: item.productId,
            quantity: item.quantity,
          });
          return await newOrderItem.save();
        })
      );
  
      // Clear user's cart
      await CartItem.deleteMany({ userId: userid });
  
      // Respond with the created order items
      res.status(200).json({
        message: "Order placed successfully",
        orderItems: orderItems,
      });
    } catch (error) {
      console.log("Error finalizing order:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  



  

  exports.orderDetails = async (req, res) => {
    try {
      const { userid } = req.params;
  
      // Fetch all order items for the given user ID
      const orderDetails = await OrderItem.find({ userId: userid }).populate("productId");

  
      if (!orderDetails || orderDetails.length === 0) {
        return res.status(404).json({ message: 'No order details found for this user.' });
      }
  
      res.status(200).json({ orderDetails });
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ message: 'Server error fetching order details.' });
    }
  };
  