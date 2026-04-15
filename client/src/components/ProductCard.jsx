import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const StarRating = ({ rating }) => {
  const getRatingClass = (r) => {
    if (r >= 4) return 'high';
    if (r >= 3) return 'mid';
    return 'low';
  };
  return (
    <span className={`rating-chip ${getRatingClass(rating)}`}>
      {rating} ★
    </span>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const discount = Math.round(
    ((product.original_price - product.price) / product.original_price) * 100
  );
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const image = product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300';

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'; }}
        />
        <button
          className={`wishlist-btn ${wishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>
        {discount > 0 && (
          <span className="card-discount-badge">{discount}% off</span>
        )}
      </div>

      <div className="product-card-body">
        {product.is_assured && (
          <span className="assured-badge">
            <span className="assured-text">FLIPKART</span>
            <span className="assured-checks">✓✓✓ Assured</span>
          </span>
        )}

        <h3 className="product-card-name">{product.name}</h3>

        <div className="product-card-meta">
          <StarRating rating={parseFloat(product.rating)} />
          <span className="rating-count text-muted text-sm">({product.rating_count?.toLocaleString()})</span>
        </div>

        <div className="product-card-pricing">
          <span className="price-current">₹{parseInt(product.price).toLocaleString()}</span>
          {discount > 0 && (
            <>
              <span className="price-original">₹{parseInt(product.original_price).toLocaleString()}</span>
              <span className="price-discount">{discount}% off</span>
            </>
          )}
        </div>

        {product.stock === 0 && (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
