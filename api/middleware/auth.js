const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const authMiddleware = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  return decoded;
};

module.exports = { authMiddleware, verifyToken };
