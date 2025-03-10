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
        <Card className="product-card">
            <Card.Body>
                <Card.Title className="order-card-title">Order: {order.id}</Card.Title>
                <Card.Text>
                    {order.Products.map((product) => (
                        <div>
                            <pre>{product.name}: Quantity: {product.OrderProducts.quantity}  Price: ${product.pricePerUnit*product.OrderProducts.quantity}
                            </pre>
                        </div>
                    ))}
                    <p className="order-card-total">Total: ${total}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default OrderCard;
