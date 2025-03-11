import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CartDropdown from './CartDropdown';
import { Product } from '../interfaces/Products';
import ConcessionStandIcon from '../assets/ConcessionStandIcon.jpg';
import './Header.css';

interface HeaderProps {
  logOut: () => void;
  cartItems: Product[];
  handleRemoveFromCart: (product: Product) => void;
  handleCheckout: () => void;
}

const Header: React.FC<HeaderProps> = ({ logOut, cartItems, handleRemoveFromCart, handleCheckout }) => {
  const navigate = useNavigate();

  const handleViewOrderHistory = () => {
    navigate('../OrderHistory');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 custom-navbar">
      <Navbar.Brand href="#" className="d-flex align-items-center">
        <img src={ConcessionStandIcon} alt="Concession Stand Icon" className="custom-navbar-icon" />
        <span className="custom-navbar-brand">Concession Stand</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown title="View Cart" id="basic-nav-dropdown">
            <CartDropdown
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
              handleCheckout={handleCheckout}
            />
          </NavDropdown>
          <Nav.Link onClick={handleViewOrderHistory} className="custom-nav-link">View Order History</Nav.Link>
          <Nav.Link onClick={logOut} className="custom-nav-link">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;