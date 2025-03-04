import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SuccessToast from '../components/SuccessToast';
import ProductCard from '../components/ProductCard';

const BuyerDashboard = () => {
  const [showToast, setShowToast] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <SuccessToast show={showToast} message="Logged in successfully!" onClose={() => setShowToast(false)} />
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyerDashboard;