import express from 'express';
import {
  getCustomerById,
  getCustomers,
  loginCustomer,
  registerCustomer
} from '../controllers/customerController';
import {
  customerLoginValidator,
  customerRegisterValidator
} from '../validators/customerValidator';
import { validateCustomer } from '../middlewares/validateCustomer';

const routerCustomer = express.Router();

routerCustomer.get('/', getCustomers);
routerCustomer.get('/:customerId', getCustomerById);
routerCustomer.post(
  '/register',
  validateCustomer(customerRegisterValidator),
  registerCustomer
);
routerCustomer.post(
  '/login',
  validateCustomer(customerLoginValidator),
  loginCustomer
);

export default routerCustomer;
