import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    pricePerUnit: number;
    supply: number;
    img_url: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    if (quantity < product.supply) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.img_url} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Price: ${product.pricePerUnit}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="danger" onClick={handleDecrease}>-</Button>
          <span>{quantity}</span>
          <Button variant="success" onClick={handleIncrease}>+</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;