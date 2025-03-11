import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SuccessToast from '../components/SuccessToast';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Auth from '../utils/auth';
import { Product } from '../interfaces/Products';
import { UserLogin } from '../interfaces/UserLogin';
import { CartItem } from '../interfaces/CartItem';
import { createOrder, updateProduct } from '../api/buyAPI';

const BuyerDashboard = () => {
  const [showToast, setShowToast] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);

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

  useEffect(() => {
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

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 0) + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
  };

  const handleCheckout = async () => {
    try {
      for (const product of products){
        for (const item of cartItems) {
          if(product.id === item.id) {
            product.supply -= item.quantity || 0;
            await updateProduct(product)
          }
        }
      }
      const sendItems: CartItem[] = cartItems.map(item => {
        return{
          quantity: item.quantity || 0,
          productId: item.id
        }
      })
      await createOrder(userId, sendItems);

      setCartItems([]);
      await fetchProducts();

    } catch (err) {
      console.error('Failed to place order', err);
      alert('Failed to place order');
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
    Auth.logout();
  };

  // Sort products by name, with "(20 oz.)" products at the bottom
  const sortedProducts = [...products].sort((a, b) => {
    const isA20oz = a.name.includes('(20 oz.)');
    const isB20oz = b.name.includes('(20 oz.)');

    if (isA20oz && !isB20oz) return 1;
    if (!isA20oz && isB20oz) return -1;
    return a.name.localeCompare(b.name);
  });

  return (
    <Container className="mt-2 buyer-dashboard-container">
      <SuccessToast show={showToast} message="Logged in successfully!" onClose={() => setShowToast(false)} />
      <Header logOut={logOut} cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} handleCheckout={handleCheckout} />
      <div className="product-cards-container">
        <Row>
          {sortedProducts.map((product) => (
            <Col key={product.id} xs={12} md={6} className="mb-4 no-margin-bottom">
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default BuyerDashboard;