import { useState } from 'react';
import { Button, ListGroup, Collapse, Image } from 'react-bootstrap';
import { Product } from '../interfaces/Products';

interface CartProps {
  cartItems: Product[];
  userID: number;
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [open, setOpen] = useState(false);

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
            onClick={() => setOpen(!open)}
          >
            Buy Now
          </Button>
        </div>
      </Collapse>
    </div>
  );
};

export default Cart;