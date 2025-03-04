import { useState } from 'react';
import { Button, ListGroup, Collapse, Image } from 'react-bootstrap';

interface CartProps {
  cartItems: any[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="cart-collapse"
        aria-expanded={open}
        className="mt-4"
      >
        View Cart
      </Button>
      <Collapse in={open}>
        <div id="cart-collapse">
          <ListGroup className="mt-3">
            {cartItems.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <Image src={item.img_url} rounded style={{ width: '50px', height: '50px', marginRight: '10px' }} />
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
    </>
  );
};

export default Cart;