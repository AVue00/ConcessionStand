import { Product } from '../interfaces/Products'
import Auth from '../utils/auth';
const createOrder = async(userId: number) => {
    const user = { userId }
    try{
        await fetch('/api/orders/', {
           method: 'POST',
           headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(user)
        });
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