import React from 'react';
import { Dropdown, Button, Image } from 'react-bootstrap';
import { Product } from '../interfaces/Products';
import { createOrder, updateProduct } from '../api/buyAPI';
import Auth from '../utils/auth';

interface CartDropdownProps {
  cartItems: Product[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
  handleCheckout: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ cartItems, handleAddToCart, handleRemoveFromCart, handleCheckout }) => {
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.pricePerUnit || 0;
    const quantity = item.quantity || 0;
    return total + price * quantity;
  }, 0);

  const handleCheckoutClick = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User not logged in');
      }

      // Update product supply
      for (const item of cartItems) {
        await updateProduct({ ...item, supply: item.supply - (item.quantity || 0) });
      }

      // Create order
      const orderItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity || 0,
      }));
      await createOrder(Number(userId), orderItems);

      // Clear cart items
      handleCheckout();

      // Calculate the pickup time
      const pickupTime = new Date();
      pickupTime.setMinutes(pickupTime.getMinutes() + 8);
      let formattedPickupTime = pickupTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      alert(`Your order will be ready for pickup at ${formattedPickupTime}!`);
      
      // Clear cart on page refresh
      window.location.reload();
    } catch (err) {
      console.error('Failed to place order', err);
      alert('Failed to place order');
    }
  };

  const handleRemoveAllFromCart = (product: Product) => {
    handleRemoveFromCart(product);
  };

  return (
    <Dropdown.Menu className="cart-dropdown">
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <Dropdown.Item key={index} className="d-flex align-items-center cart-item">
            <Image src={item.img_url} rounded className="cart-item-image" />
            <div className="cart-item-details">
              <p className="mb-0">{item.name}</p>
              <p className="mb-0">Price: ${item.pricePerUnit?.toFixed(2)}</p>
              <p className="mb-0">Quantity: {item.quantity}</p>
              <p className="mb-0">Total: ${(item.pricePerUnit * (item.quantity || 0)).toFixed(2)}</p>
            </div>
            <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleRemoveAllFromCart(item); }} className="remove-from-cart-button">Remove from cart</Button>
          </Dropdown.Item>
        ))
      ) : (
        <Dropdown.Item>Your cart is empty!</Dropdown.Item>
      )}
      <Dropdown.Divider />
      <Dropdown.Item className="cart-total">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className="checkout-button text-center">
        <Button variant="primary" onClick={handleCheckoutClick}>Checkout</Button>
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default CartDropdown;