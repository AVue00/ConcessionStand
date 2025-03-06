import { useState } from 'react';
import { Button, ListGroup, Collapse, Image } from 'react-bootstrap';
import { Product } from '../interfaces/Products';
import { createOrder, updateProduct} from '../api/buyAPI'
interface CartProps {
  products: Product[];
  cartItems: Product[];
  userId: number;
}




const Cart: React.FC<CartProps> = ({ cartItems, userId, products }) => {
  const [open, setOpen] = useState(false);
  
  const buyNow = () => {
    if (cartItems.length === 0 ){
      alert("Cart is Empty")
    }else {
      createOrder(userId);
      for(const product of products){
        for(const cartItem of cartItems){
          if(product.id === cartItem.id){
           product.supply -= cartItem.supply
           updateProduct(product);
          }
        }
      }
      window.location.assign('/BuyerDashboard');
    }
  }
  
  return (
    <div className="cart-container">
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="cart-collapse"
        aria-expanded={open}
        className="cart-toggle-button"
      >
        {open ? '▼' : '▲'}
      </Button>
      <Collapse in={open}>
        <div id="cart-collapse" className="cart-content">
          <ListGroup className="mt-3">
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center cart-item">
                <Image src={item.img_url} rounded className="cart-item-image" />
                <div className="flex-grow-1">
                  <div>{item.name}</div>
                  <div>Quantity: {item.supply}</div>
                  <div>${item.pricePerUnit*item.supply}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button
            onClick={buyNow}
          >
            Buy Now
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default Cart;