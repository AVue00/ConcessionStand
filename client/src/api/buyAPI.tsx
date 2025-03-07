import { Product } from '../interfaces/Products'
import { CartItem } from '../interfaces/CartItem';

import Auth from '../utils/auth';
const createOrder = async(userId: number, cartItems: CartItem[]) => {
    const user = { userId, cartItems }
    try{
        const resp = await fetch('/api/orders/', {
           method: 'POST',
           headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(user)
        });
        const data = await resp.json();
        return data
    }catch(err){
        console.log("error making order:" , err)
    }
}

const updateProduct = async(product: Product) => {
    try{
        await fetch(`/api/products/${product.id}`,{
            method:'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(product)
        })
    }catch(err){
        console.log('error updating products', err)
    }
}

export { createOrder, updateProduct } ;