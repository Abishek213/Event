
import jwt from 'jsonwebtoken';

import User from '../model/user.schema.js';

// Protect routes and check if user is authenticated
export const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user; // Ensure this line sets req.user
      next();
  } catch (err) {
      console.error(err.message);
      return res.status(401).json({ message: 'Invalid token' });
  }
};
