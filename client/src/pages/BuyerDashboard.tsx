import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SuccessToast from '../components/SuccessToast';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

const BuyerDashboard = () => {
  const [showToast, setShowToast] = useState(true);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  return (
    <Container className="mt-4">
      <SuccessToast show={showToast} message="Logged in successfully!" onClose={() => setShowToast(false)} />
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4} className="mb-4">
            <ProductCard product={product} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
          </Col>
        ))}
      </Row>
      <Cart cartItems={cartItems} />
    </Container>
  );
};

export default BuyerDashboard;