import { Router, Request, Response  } from 'express';
import { Order } from '../../models/order.js'
import { OrderProducts } from '../../models/orderProducts.js'

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

const createOrders = async (req: Request, res: Response) => {
    try {
        const data = await Order.create(req.body);
        const orderId = data.dataValues.id;
        res.status(201).json({orderId});
    }catch (err: any){
        res.status(400).json({message: err.message});
    }
};

const setJoinTable = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        await OrderProducts.create(req.body);
        res.status(201).json({message: 'order created!'});
    }catch (err: any){
        res.status(400).json({message: err.message});
    }
};


router.get('/',getOrders);

router.post('/',createOrders);

router.post('/join', setJoinTable);

export{ router as orderRouter };