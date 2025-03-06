import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../interfaces/Products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onRemoveFromCart }) => {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={product.img_url} className="product-card-image" />
      <Card.Body className="product-card-body">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          Price: ${product.pricePerUnit}
        </Card.Text>
        <Button variant="primary" onClick={() => onAddToCart(product)}> + </Button>
        <Button variant="danger" onClick={() => onRemoveFromCart(product)} className="ml-2"> - </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;