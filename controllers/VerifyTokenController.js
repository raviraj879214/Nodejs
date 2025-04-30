const jwt = require('jsonwebtoken');



// Controller function to decode the JWT and check expiration
const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];  // Get the token from the Authorization header

  if (!token) {
    return res.status(404).json({ valid: false, message: 'No token provided' });
  }

  try {
    // Decode the token without verifying its signature
    const decoded = jwt.decode(token);

    if (!decoded || !decoded.exp) {
      return res.status(404).json({ valid: false, message: 'Invalid token structure' });
    }

    // Get the current time in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    if (decoded.exp < currentTime) {
      return res.status(404).json({ valid: false, message: 'Token has expired' });
    }

    // If not expired
    return res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(404).json({ valid: false, message: 'Error decoding token' });
  }
};



module.exports = {
  verifyToken
};
