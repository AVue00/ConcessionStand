import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface OrderHistoryHeaderProps {
  logOut: () => void;
}

const OrderHistoryHeader: React.FC<OrderHistoryHeaderProps> = ({ logOut }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/BuyerDashboard');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand href="#">Concession Stand</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Button variant="primary" onClick={handleDashboardClick} className="return-to-dashboard-button mr-2">Return to Dashboard</Button>
          <Button variant="danger" onClick={logOut} className="order-history-logout-button">Log Out</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default OrderHistoryHeader;