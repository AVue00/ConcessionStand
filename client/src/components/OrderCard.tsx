import React from 'react';
import { Card } from 'react-bootstrap';

interface OrderCardProps {
    order: number;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Order: {order}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default OrderCard;
