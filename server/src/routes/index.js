import express from 'express';
import routerCustomer from './customerRoute';
import routeProduct from './productRoute';

const router = express.Router();

router.use('/customers', routerCustomer);
router.use('/products', routeProduct);

export default router;
