import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/productController';
import { productValidator } from '../validators/productsValidator';
import { validateProduct } from '../middlewares/validateProduct';
import { checkPermission } from '../middlewares/checkPermission';

const routeProduct = express.Router();

routeProduct.get('/', getProducts);
routeProduct.get('/:productId', getProductById);
routeProduct.post(
  '/create-product',
  validateProduct(productValidator),
  checkPermission,

  createProduct
);
routeProduct.put(
  '/update-product/:productId',
  validateProduct(productValidator),
  checkPermission,
  updateProduct
);

routeProduct.delete(
  '/delete-product/:productId',
  checkPermission,
  deleteProduct
);

export default routeProduct;
