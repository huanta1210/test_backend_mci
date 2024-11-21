import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Customer from '../models/customerModel';
dotenv.config();
export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json('No token provided');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const customer = await Customer.findById(decoded._id);

    if (customer.role !== 'admin') {
      return res.status(403).json('You do not have access');
    }
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};
