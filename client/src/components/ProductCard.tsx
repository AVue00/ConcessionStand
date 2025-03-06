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
      <Card.Body className="product-card-body">
        <div>
          <Card.Text className="product-card-price">${product.pricePerUnit}</Card.Text>
          <Card.Title className="product-card-title">{product.name}</Card.Title>
        </div>
        <Card.Img variant="top" src={product.img_url} className="product-card-image" />
        <div className="product-card-buttons">
          <Button variant="primary" onClick={() => onAddToCart(product)}> + </Button>
          <Card.Text>
            In Stock: {product.supply}
          </Card.Text>
          <Button variant="danger" onClick={() => onRemoveFromCart(product)} className="ml-2"> - </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;