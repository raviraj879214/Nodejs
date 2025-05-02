const express = require('express');
const passport = require('passport');
const app = express();
const cors = require("cors");
const port = 5000;

const connectMongoDB = require('./db/mongo');
const userRoutes = require('./routes/userRoutes');
const morgan = require('morgan');



const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Cartitem = require('./models/CartItem');
const Category = require('./models/Category');
const Order = require('./models/Order');
const Orderitem = require('./models/OrderItem');




app.use(morgan('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
connectMongoDB();


app.use('/uploads', express.static('uploads'));
app.use('/api', userRoutes);



User.createCollection();
Product.createCollection();
Cart.createCollection();
Cartitem.createCollection();
Category.createCollection();
Order.createCollection();
Orderitem.createCollection();






app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
