import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './OrderHistoryPage.css';

const STATUS_COLORS = {
  PLACED: '#2874f0',
  CONFIRMED: '#ff6f00',
  SHIPPED: '#7b1fa2',
  DELIVERED: '#388e3c',
  CANCELLED: '#d32f2f',
};

const STATUS_ICONS = {
  PLACED: '📋',
  CONFIRMED: '✅',
  SHIPPED: '🚚',
  DELIVERED: '📦',
  CANCELLED: '❌',
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2 className="orders-heading">My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-state" style={{ background: 'white', borderRadius: 4 }}>
            <div className="empty-icon">📦</div>
            <h3>No orders yet!</h3>
            <p>Once you place an order, it will appear here.</p>
            <Link to="/" className="btn btn-primary btn-sm">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card animate-fade">
                {/* Order header */}
                <div className="order-card-header">
                  <div className="order-card-id">
                    <span className="order-label">Order ID</span>
                    <span className="order-val fw-700">#{String(order.id).padStart(8, '0')}</span>
                  </div>
                  <div className="order-card-date">
                    <span className="order-label">Placed on</span>
                    <span className="order-val">
                      {new Date(order.placed_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="order-card-total">
                    <span className="order-label">Total</span>
                    <span className="order-val fw-700">₹{Math.round(order.total).toLocaleString()}</span>
                  </div>
                  <div
                    className="order-status-chip"
                    style={{ background: STATUS_COLORS[order.status] + '15', color: STATUS_COLORS[order.status], borderColor: STATUS_COLORS[order.status] + '30' }}
                  >
                    {STATUS_ICONS[order.status]} {order.status}
                  </div>
                </div>

                {/* Items */}
                <div className="order-card-items">
                  {order.items && order.items.map(item => (
                    <div key={item.id} className="order-card-item">
                      {item.product_image && (
                        <div className="order-card-item-img-wrap">
                          <img src={item.product_image} alt={item.product_name} className="order-card-item-img" />
                        </div>
                      )}
                      <div className="order-card-item-info">
                        <span className="order-card-item-name">{item.product_name}</span>
                        <span className="text-muted text-sm">Qty: {item.quantity} · ₹{parseInt(item.price).toLocaleString()} each</span>
                      </div>
                      <span className="order-card-item-total fw-700">
                        ₹{(parseInt(item.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping & actions */}
                <div className="order-card-footer">
                  <div className="order-shipping-addr">
                    <span className="order-label">Delivered to:</span>
                    <span>{order.shipping_name} · {order.shipping_city}, {order.shipping_state}</span>
                  </div>
                  <div className="order-card-actions">
                    <Link to={`/order-confirmation/${order.id}`} className="btn btn-outline btn-sm">View Details</Link>
                    {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                      <button className="btn btn-sm" style={{ border: '1px solid #d32f2f', color: '#d32f2f' }}>
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
