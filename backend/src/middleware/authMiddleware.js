import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // Getting authorization from the headers
  const authHeader = req.headers['authorization'];
  // Extracting token
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Validating token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // For server side
      console.error('Token validation error: ', err);

      // For client side
      return res.status(403).json({ message: 'Token is invalid' });
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
