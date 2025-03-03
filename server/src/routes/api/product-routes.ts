import { Router, Request, Response  } from 'express';
import { Product } from '../../models/product.js'

const router = Router();

const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
        });
        res.json(products);
    } catch (err:any){
        res.status(500).json({message: err.message})
    }
}

const updateProducts = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { supply } = req.body;
    try{
        const product = await Product.findByPk(id);
        if(product) {
            product.supply = supply;
            await product.save();
            res.status(200).json({message: 'product updated'});
        } else {
            res.status(404).json({message: 'product not found'})
        }
    } catch(err: any){
        res.status(400).json({message: err.message});
    }
};

router.get('/',getProducts);

router.put('/:id', updateProducts);

export{ router as productRouter };