import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${orderId}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-card animate-pop">
          {/* Success animation */}
          <div className="success-animation">
            <div className="success-circle">
              <span className="success-check">✓</span>
            </div>
          </div>

          <h1 className="confirmation-title">Order Placed Successfully! 🎉</h1>
          <p className="confirmation-subtitle">
            Your order has been placed and is being processed.
          </p>

          {order && (
            <>
              <div className="order-id-box">
                <span className="order-id-label">Order ID</span>
                <span className="order-id-value">#{String(order.id).padStart(8, '0')}</span>
                <span className="order-id-badge">PLACED</span>
              </div>

              <div className="order-meta">
                <div className="order-meta-item">
                  <span className="meta-icon">📦</span>
                  <div>
                    <div className="meta-label">Items Ordered</div>
                    <div className="meta-value">{order.items?.length || 0} item(s)</div>
                  </div>
                </div>
                <div className="order-meta-item">
                  <span className="meta-icon">💰</span>
                  <div>
                    <div className="meta-label">Order Total</div>
                    <div className="meta-value fw-700">₹{Math.round(order.total).toLocaleString()}</div>
                  </div>
                </div>
                <div className="order-meta-item">
                  <span className="meta-icon">🚚</span>
                  <div>
                    <div className="meta-label">Delivery</div>
                    <div className="meta-value">Estimated 2–5 Business Days</div>
                  </div>
                </div>
              </div>

              {/* Items */}
              {order.items && order.items.length > 0 && (
                <div className="confirmation-items">
                  <h3 className="confirmation-items-title">Items in this order</h3>
                  {order.items.map(item => (
                    <div key={item.id} className="confirmation-item">
                      {item.product_image && (
                        <img src={item.product_image} alt={item.product_name} className="conf-item-img" />
                      )}
                      <div className="conf-item-info">
                        <span className="conf-item-name">{item.product_name}</span>
                        <span className="text-muted text-sm">Qty: {item.quantity}</span>
                      </div>
                      <span className="conf-item-price fw-700">
                        ₹{(parseInt(item.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Shipping address */}
              <div className="shipping-address-block">
                <h4>📍 Delivering to</h4>
                <p>
                  <strong>{order.shipping_name}</strong> · {order.shipping_phone}<br />
                  {order.shipping_address_line},<br />
                  {order.shipping_city}, {order.shipping_state} – {order.shipping_pincode}
                </p>
              </div>
            </>
          )}

          <div className="confirmation-actions">
            <Link to="/orders" className="btn btn-primary">View My Orders</Link>
            <Link to="/" className="btn btn-outline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
