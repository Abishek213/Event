import jwt from 'jsonwebtoken';

// Middleware to protect admin routes
export const protectAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user has admin role (you can fetch this from the user object or role collection)
    if (decoded.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = decoded; // Attach user info to request for further use
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
