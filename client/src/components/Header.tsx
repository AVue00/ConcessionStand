import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartDropdown from './CartDropdown';
import { Product } from '../interfaces/Products';

interface HeaderProps {
  logOut: () => void;
  cartItems: Product[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
  handleCheckout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logOut, cartItems, handleAddToCart, handleRemoveFromCart, handleCheckout }) => {
  const navigate = useNavigate();

  const handleViewOrderHistory = () => {
    navigate('/pages/OrderHistory');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand href="#">Concession Stand</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title="View Cart" id="basic-nav-dropdown">
            <CartDropdown
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleCheckout={handleCheckout}
            />
          </NavDropdown>
          <Nav.Link onClick={handleViewOrderHistory}>View Order History</Nav.Link>
          <Nav.Link onClick={logOut}>Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;