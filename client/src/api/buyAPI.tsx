import { Product } from '../interfaces/Products'
import { CartItem } from '../interfaces/CartItem';

import Auth from '../utils/auth';
const createOrder = async(userId: number) => {
    const user = { userId }
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

const setupOrder = async(cartItem: CartItem) => {
    try{
        await fetch('api/orders/join', {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(cartItem)
        })
    }catch(err){
        console.log('error setting cart items', err)
    }
}
export { createOrder, updateProduct, setupOrder } ;