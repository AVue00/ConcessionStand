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

export { createOrder } ;