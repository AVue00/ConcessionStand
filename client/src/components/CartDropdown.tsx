import React from 'react';
import { Dropdown, Button, Image } from 'react-bootstrap';
import { Product } from '../interfaces/Products';

interface CartDropdownProps {
  cartItems: Product[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
  handleCheckout: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ cartItems, handleAddToCart, handleRemoveFromCart, handleCheckout }) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.pricePerUnit || 0) * (item.supply || 0), 0);

  return (
    <Dropdown.Menu className="cart-dropdown">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <Dropdown.Item key={index} className="d-flex align-items-center cart-item">
            <Image src={item.img_url} rounded className="cart-item-image" />
            <div className="cart-item-details">
              <p className="mb-0">{item.name}</p>
              <p className="mb-0">Price: ${item.pricePerUnit?.toFixed(2)}</p>
              <div className="d-flex align-items-center cart-item-actions">
                <Button variant="link" onClick={() => handleRemoveFromCart(item)}>-</Button>
                <span>{item.supply}</span>
                <Button variant="link" onClick={() => handleAddToCart(item)}>+</Button>
              </div>
              <p className="mb-0">Total: ${(item.pricePerUnit * item.supply).toFixed(2)}</p>
            </div>
          </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item>No items in cart</Dropdown.Item>
      )}
      <Dropdown.Divider />
      <Dropdown.Item className="cart-total">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className="checkout-button text-center">
        <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default CartDropdown;