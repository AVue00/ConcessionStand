import React from 'react';
import { Card } from 'react-bootstrap';
import Order from '../interfaces/Order';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Order: {order.id}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default OrderCard;
