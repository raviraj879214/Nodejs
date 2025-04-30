const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path to your User model



// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with the hashed password stored in the database
    if (password !== user.passwordHash) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Create JWT payload
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role : user.role
    };

    // Sign JWT Token
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '60h' }); // Replace with a more secure secret or use environment variables

    // Send the token back as response
    res.json({ token: `${token}` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

};

module.exports = { login };
