import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart, loading: cartLoading } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="empty-state" style={{ background: 'white', borderRadius: 4, padding: '60px 20px' }}>
            <div className="empty-icon">❤️</div>
            <h3>Empty Wishlist</h3>
            <p>You have no items in your wishlist. Start adding!</p>
            <Link to="/" className="btn btn-primary" style={{ marginTop: '16px' }}>Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <h2 className="wishlist-heading">My Wishlist ({wishlistItems.length})</h2>

        <div className="wishlist-grid">
          {wishlistItems.map(item => {
            const product = item.product;
            if (!product) return null;

            const image = product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300';
            const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

            const handleAddToCart = () => {
              addToCart(product.id, 1);
            };

            return (
              <div key={item.id} className="wishlist-card animate-fade">
                <Link to={`/product/${product.id}`} className="wishlist-card-image-wrap">
                  <img src={image} alt={product.name} className="wishlist-card-image" />
                  <button 
                    className="wishlist-remove-btn" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    title="Remove from Wishlist"
                  >
                    🗑️
                  </button>
                  {discount > 0 && <span className="card-discount-badge">{discount}% off</span>}
                </Link>

                <div className="wishlist-card-body">
                  <Link to={`/product/${product.id}`} className="wishlist-card-name">
                    {product.name}
                  </Link>

                  <div className="wishlist-card-rating">
                    <span className="rating-chip high">{product.rating} ★</span>
                    <span className="text-muted text-sm">({product.rating_count?.toLocaleString()})</span>
                  </div>

                  <div className="wishlist-card-pricing">
                    <span className="price-current">₹{parseInt(product.price).toLocaleString()}</span>
                    {discount > 0 && (
                      <span className="price-original">₹{parseInt(product.original_price).toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="wishlist-card-footer">
                  <button 
                    className="wishlist-add-to-cart btn" 
                    onClick={handleAddToCart}
                    disabled={cartLoading || product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
