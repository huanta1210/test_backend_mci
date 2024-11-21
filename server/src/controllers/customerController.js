import Customer from '../models/customerModel';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

export const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json('All fields are required');
    }

    let customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).json({
        message: 'Customer with the given email already exists'
      });
    }

    customer = new Customer({ name, email, password });

    const salt = await bcryptjs.genSalt(10);
    customer.password = await bcryptjs.hash(customer.password, salt);
    await customer.save();

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json('Error register customer');
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json('Email and password are required');
    }
    let customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const isValidPassword = await bcryptjs.compare(password, customer.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = createToken(customer._id);

    return res.status(200).json({
      customer,
      acessToken: token
    });
  } catch (error) {
    return res.status(500).json('Error login customer');
  }
};

export const getCustomerById = async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json('Error get customer by id');
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customer = await Customer.find({});
    if (!customer) {
      return res.status(404).json({ message: 'Customers not found' });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json('Error get customers');
  }
};
