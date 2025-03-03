import { Router } from 'express';
import { productRouter } from './product-routes.js';
import { orderRouter } from './order-routes.js';

const router = Router();
router.use('/products', productRouter);
router.use('/orders', orderRouter);
export default router;