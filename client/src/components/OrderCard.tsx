import React from 'react';
import { Card } from 'react-bootstrap';
import Order from '../interfaces/Order';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    let total = 0;
    order.Products.forEach((product) => {
        total += product.pricePerUnit * product.OrderProducts.quantity;
    });
    return (
        <Card className="order-card">
            <Card.Body>
                <Card.Title className="order-card-title">Order ID: {order.id}</Card.Title>
                <Card.Text>
                    {order.Products.map((product) => (
                        <div key={product.id} className="order-card-content">
                            <p className="product-name">{product.name}</p>
                            <p>Quantity: {product.OrderProducts.quantity}</p>
                            <p>Price: ${product.pricePerUnit * product.OrderProducts.quantity}</p>
                        </div>
                    ))}
                    <p className="order-card-total">Order Total: ${total}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default OrderCard;