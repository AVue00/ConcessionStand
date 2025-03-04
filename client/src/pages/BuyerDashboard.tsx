import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SuccessToast from '../components/SuccessToast';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import Auth from '../utils/auth';
import { UserLogin } from "../interfaces/UserLogin";

const BuyerDashboard = () => {
  const [showToast, setShowToast] = useState(true);
  const [products, setProducts] = useState([]);
  const [userID, setUserID] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          '/api/products/',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Auth.getToken()}`
            }
          }
        );
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    const findUser = async (userInfo: UserLogin) => {
      try{
        const response = await fetch('/auth/findUser', {
          method:'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(userInfo)
        });
    
        if(!response.ok){
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        setUserID(data);
      }catch (err){
        console.error('Failed to fetch user', err);
      }
    }
    findUser({username: localStorage.getItem('user'),password: ''})
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

  const logOut = () => {
    localStorage.removeItem('user');
    Auth.logout();
  }
  return (
  
    <Container className="mt-4">
      <Button onClick={logOut}>Log Out</Button>
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