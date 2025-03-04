import { useState } from 'react';
import { Button, ListGroup, Collapse, Image } from 'react-bootstrap';

interface CartProps {
  cartItems: any[];
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
                  <div>Quantity: {item.quantity}</div>
                </div>
                <div>${item.pricePerUnit}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Collapse>
    </div>
  );
};

export default Cart;