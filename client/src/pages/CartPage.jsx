import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.product?.original_price || 0) * item.quantity, 0);
  const discount = subtotal - cartTotal;
  const deliveryFee = cartTotal > 500 ? 0 : 40;
  const total = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="empty-state" style={{ background: 'white', borderRadius: 4, padding: '60px 20px' }}>
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty!</h3>
            <p>Add items to it now.</p>
            <Link to="/" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-grid">
          {/* Cart items */}
          <div className="cart-items-section">
            <div className="cart-header">
              <h2 className="cart-title">My Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h2>
            </div>

            {cartItems.map(item => {
              const product = item.product;
              if (!product) return null;
              const img = product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200';
              const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

              return (
                <div key={item.id} className="cart-item">
                  <Link to={`/product/${product.id}`} className="cart-item-image-wrap">
                    <img src={img} alt={product.name} className="cart-item-image" />
                  </Link>
                  <div className="cart-item-info">
                    <Link to={`/product/${product.id}`} className="cart-item-name">{product.name}</Link>
                    <div className="cart-item-brand text-muted text-sm">{product.brand}</div>

                    <div className="cart-item-price-row">
                      <span className="cart-item-price">₹{parseInt(product.price).toLocaleString()}</span>
                      <span className="price-original" style={{ fontSize: '13px' }}>₹{parseInt(product.original_price).toLocaleString()}</span>
                      {discount > 0 && <span className="price-discount" style={{ fontSize: '13px' }}>{discount}% off</span>}
                    </div>

                    <div className="cart-item-actions">
                      <div className="qty-picker">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= product.stock}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        REMOVE
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-total">
                    ₹{(parseInt(product.price) * item.quantity).toLocaleString()}
                  </div>
                </div>
              );
            })}

            <div className="cart-checkout-row">
              <button className="btn btn-orange btn-lg place-order-btn" onClick={() => navigate('/checkout')}>
                Place Order →
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="price-summary">
            <h3 className="price-summary-title">PRICE DETAILS</h3>
            <hr className="divider" />
            <div className="price-row">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{Math.round(subtotal).toLocaleString()}</span>
            </div>
            <div className="price-row text-green">
              <span>Discount</span>
              <span>−₹{Math.round(discount).toLocaleString()}</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className={deliveryFee === 0 ? 'text-green' : ''}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <hr className="divider" />
            <div className="price-row total-row">
              <span>Total Amount</span>
              <span>₹{Math.round(total).toLocaleString()}</span>
            </div>
            <hr className="divider" />
            {discount > 0 && (
              <div className="savings-banner text-green">
                🎉 You will save ₹{Math.round(discount).toLocaleString()} on this order!
              </div>
            )}
            <button className="btn btn-orange btn-lg" style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
              Place Order →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
