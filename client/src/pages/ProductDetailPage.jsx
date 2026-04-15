import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetailPage.css';

const ImageCarousel = ({ images, name }) => {
  const [selected, setSelected] = useState(0);

  if (!images || images.length === 0) {
    images = ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'];
  }

  return (
    <div className="image-carousel">
      <div className="thumbnail-strip">
        {images.map((img, i) => (
          <div
            key={i}
            className={`thumbnail ${i === selected ? 'active' : ''}`}
            onClick={() => setSelected(i)}
          >
            <img src={img} alt={`${name} view ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="main-image-wrap">
        <img
          key={selected}
          src={images[selected]}
          alt={name}
          className="main-image animate-fade"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'; }}
        />
        <div className="image-nav">
          <button
            className="img-nav-btn"
            onClick={() => setSelected(i => (i - 1 + images.length) % images.length)}
            disabled={images.length <= 1}
          >◀</button>
          <span className="img-counter">{selected + 1} / {images.length}</span>
          <button
            className="img-nav-btn"
            onClick={() => setSelected(i => (i + 1) % images.length)}
            disabled={images.length <= 1}
          >▶</button>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [specOpen, setSpecOpen] = useState(true);
  const { addToCart, loading: cartLoading } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!product) return <div className="empty-state"><div className="empty-icon">😕</div><h3>Product not found</h3></div>;

  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
  const wishlisted = isWishlisted(product.id);
  const getRatingClass = (r) => r >= 4 ? 'high' : r >= 3 ? 'mid' : 'low';

  const handleBuyNow = async () => {
    await addToCart(product.id, qty);
    navigate('/cart');
  };

  const handleAddToCart = () => {
    addToCart(product.id, qty);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-sep">›</span>
          <span onClick={() => navigate(`/?category=${product.category?.slug}`)} className="breadcrumb-link">
            {product.category?.name}
          </span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Left: Image + actions */}
          <div className="product-left">
            <ImageCarousel images={product.images} name={product.name} />
            <div className="product-ctas sticky-ctas">
              <div className="qty-picker">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
              </div>
              <button
                className="btn btn-orange btn-lg"
                onClick={handleAddToCart}
                disabled={cartLoading || product.stock === 0}
              >
                🛒 Add to Cart
              </button>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleBuyNow}
                disabled={cartLoading || product.stock === 0}
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="product-right">
            {product.is_assured && (
              <div className="assured-banner">
                <span className="assured-logo">FLIPKART</span>
                <span className="assured-text-full">✓ Assured — 100% Quality Checked</span>
              </div>
            )}

            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating-row">
              <span className={`rating-chip ${getRatingClass(parseFloat(product.rating))}`}>
                {product.rating} ★
              </span>
              <span className="text-muted text-sm">
                {product.rating_count?.toLocaleString()} Ratings & Reviews
              </span>
            </div>

            {/* Price */}
            <div className="product-price-block">
              <div className="product-price-row">
                <span className="price-current" style={{ fontSize: '28px' }}>
                  ₹{parseInt(product.price).toLocaleString()}
                </span>
                {discount > 0 && (
                  <>
                    <span className="price-original" style={{ fontSize: '16px' }}>
                      ₹{parseInt(product.original_price).toLocaleString()}
                    </span>
                    <span className="price-discount" style={{ fontSize: '16px' }}>
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
              <div className="offers-row">
                <div className="offer-badge">🏷️ Bank Offer</div>
                <div className="offer-text">10% off on HDFC Bank Credit Card, T&C apply</div>
              </div>
              <div className="offers-row">
                <div className="offer-badge">💳 No Cost EMI</div>
                <div className="offer-text">Starting from ₹{Math.round(product.price / 6).toLocaleString()}/month</div>
              </div>
            </div>

            {/* Stock */}
            <div className="stock-info">
              {product.stock > 0
                ? <span className="text-green fw-500">✓ In Stock ({product.stock} available)</span>
                : <span className="text-accent fw-500">✗ Out of Stock</span>
              }
            </div>

            {/* Delivery */}
            <div className="delivery-info">
              <div className="delivery-row">
                <span className="delivery-icon">🚚</span>
                <div>
                  <span className="fw-500">Free Delivery</span>
                  <span className="text-muted"> by Tomorrow</span>
                </div>
              </div>
              <div className="delivery-row">
                <span className="delivery-icon">🔄</span>
                <div>
                  <span className="fw-500">7 Day Replacement</span>
                  <span className="text-muted"> Policy</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            {/* Highlights */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="product-highlights">
                <h3 className="section-heading">Highlights</h3>
                <ul className="highlights-list">
                  {product.highlights.map((h, i) => (
                    <li key={i}>✓ {h}</li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="divider" />

            {/* Description */}
            {product.description && (
              <div className="product-description">
                <h3 className="section-heading">Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            <hr className="divider" />

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="product-specs">
                <div
                  className="specs-header"
                  onClick={() => setSpecOpen(o => !o)}
                >
                  <h3 className="section-heading">Specifications</h3>
                  <span className="specs-toggle">{specOpen ? '▲' : '▼'}</span>
                </div>
                {specOpen && (
                  <table className="specs-table animate-fade">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <tr key={key}>
                          <td className="spec-key">{key}</td>
                          <td className="spec-val">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* Wishlist button */}
            <button
              className={`wishlist-action-btn ${wishlisted ? 'wishlisted' : ''}`}
              onClick={() => toggleWishlist(product.id)}
            >
              {wishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
