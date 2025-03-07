import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SuccessToast from '../components/SuccessToast';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Auth from '../utils/auth';
import { Product } from '../interfaces/Products';
import { UserLogin } from '../interfaces/UserLogin';
import { createOrder, updateProduct } from '../api/buyAPI';

const BuyerDashboard = () => {
  const [showToast, setShowToast] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    const findUser = async (userInfo: UserLogin) => {
      try {
        const response = await fetch('/auth/findUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message}`);
        }
        const data = await response.json();
        setUserId(data);
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };
    findUser({ username: localStorage.getItem('user'), password: '' });
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.supply < product.supply) {
          return prevItems.map((item) =>
            item.id === product.id ? { ...item, supply: item.supply + 1 } : item
          );
        } else {
          alert('Cannot add more items than available in stock');
          return prevItems;
        }
      } else {
        return [...prevItems, { ...product, supply: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item: Product) => item.id === product.id);
      if (existingItem?.supply === 1) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, supply: item.supply - 1 } : item
        );
      }
    });
  };

  const handleCheckout = async () => {
    try {

      for (const item of cartItems) {
        await updateProduct({ ...item, supply: item.supply - item.quantity });
      }

      // const order = await createOrder(userId);
      // for (const item of cartItems) {
      //   await setupOrder({ quantity: item.quantity, productId: item.id, orderId: order.id });
      // }

      setCartItems([]);
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Failed to place order', err);
      alert('Failed to place order');
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
    Auth.logout();
  };

  return (
    <Container className="mt-2 buyer-dashboard-container">
      <SuccessToast show={showToast} message="Logged in successfully!" onClose={() => setShowToast(false)} />
      <Header logOut={logOut} cartItems={cartItems} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} handleCheckout={handleCheckout} />
      <div className="product-cards-container">
        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={12} className="mb-4 no-margin-bottom">
              <ProductCard product={product} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default BuyerDashboard;