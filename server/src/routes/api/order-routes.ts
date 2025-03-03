import { Router, Request, Response  } from 'express';
import { Order } from '../../models/order.js'

const router = Router();

const getOrders = async (_req: Request, res: Response) => {
    try {
        const products = await Order.findAll({
        });
        res.json(products);
    } catch (err:any){
        res.status(500).json({message: err.message})
    }
}

const createOrders = async (_req: Request, res: Response) => {
    try {
        await Order.create();
        res.status(201).json({message: "order created"});
    }catch (err: any){
        res.status(400).json({message: err.message});
    }
};

router.get('/',getOrders);

router.post('/',createOrders);

export{ router as orderRouter };