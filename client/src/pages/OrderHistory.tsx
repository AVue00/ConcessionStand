import { Container, Row, Col } from 'react-bootstrap';
import OrderCard from '../components/OrderCard';
import Auth from '../utils/auth';
import { useState, useEffect } from 'react';
import { UserLogin } from "../interfaces/UserLogin";


const OrderHistory = () => {
    const [orders, setOrders] = useState<number[]>([]);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            '/api/orders/',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
              }
            }
          );
          const data = await response.json();
          setOrders(data);
        } catch (err) {
          console.error('Failed to fetch products', err);
        }
      };

      const findUser = async (userInfo: UserLogin) => {
        try {
          const response = await fetch('/auth/findUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
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
      fetchOrders();
    }, []);

    return(
    <Container>
      <h1>Orders</h1>
      <Container>
          <Row>
          {orders.map((order) => (
            <Col key={order} xs={12} className="mb-4 no-margin-bottom">
              <OrderCard order={order} />
            </Col>
          ))}
          </Row>
      </Container>
    </Container>
    )
};

export default OrderHistory;