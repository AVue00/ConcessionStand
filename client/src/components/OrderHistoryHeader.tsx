import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConcessionStandIcon from '../assets/ConcessionStandIcon.jpg';
import './Header.css';

interface OrderHistoryHeaderProps {
  logOut: () => void;
}

const OrderHistoryHeader: React.FC<OrderHistoryHeaderProps> = ({ logOut }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/BuyerDashboard');
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
          <Button variant="danger" onClick={handleDashboardClick} className="return-to-dashboard-button">Back to Shop</Button>
          <Button variant="danger" onClick={logOut} className="order-history-logout-button">Log Out</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default OrderHistoryHeader;