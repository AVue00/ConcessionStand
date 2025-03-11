import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Product } from '../interfaces/Products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    if (quantity < product.supply) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <Card className="product-card">
      <Card.Body className="product-card-body">
        <div className="product-info">
          <Card.Title className="product-card-title">{product.name}</Card.Title>
          <Card.Text className="product-card-price">${product.pricePerUnit.toFixed(2)}</Card.Text>
        </div>
        <Card.Img variant="top" src={product.img_url} className="product-card-image" />
        <div className="product-card-buttons">
          <Button variant="primary" onClick={handleIncreaseQuantity}> + </Button>
          <Button variant="primary" onClick={handleDecreaseQuantity}> - </Button>
        </div>
        <div className="in-stock-text">
          <Card.Text>In Stock: {product.supply}</Card.Text>
        </div>
        <Button
          variant="success"
          onClick={handleAddToCart}
          disabled={quantity > product.supply}
          className="add-to-cart-button"
        >
          Add to cart
          <br />
          ({quantity})
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;