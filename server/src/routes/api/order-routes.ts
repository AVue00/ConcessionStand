import { Router, Request, Response  } from 'express';
import { Order } from '../../models/order.js'
import { CartItem } from '../../interfaces/CartItem.js'

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
        const {userId, cartItems}: {userId:number; cartItems:CartItem[]} = req.body;
        
        const order = Order.build({userId});
        await order.save();
        for(const cartItem of cartItems) {
            //@ts-ignore
            await order.addProduct(cartItem.productId,{through: {quantity: cartItem.quantity}})
        }
      

        res.status(201).json({orderId:order.id});
    }catch (err: any){
        res.status(400).json({message: err.message});
    }
};


router.get('/',getOrders);

router.post('/',createOrders);

export{ router as orderRouter };