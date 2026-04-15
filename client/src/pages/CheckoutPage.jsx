import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import './CheckoutPage.css';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh',
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, fetchCart } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: 'Prabh Singh',
    phone: '9876543210',
    pincode: '140401',
    address_line: '42, Sector 7, Phase-2',
    city: 'Panchkula',
    state: 'Haryana',
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.product?.original_price || 0) * item.quantity, 0);
  const discount = subtotal - cartTotal;
  const deliveryFee = cartTotal > 500 ? 0 : 40;
  const total = cartTotal + deliveryFee;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) errs.phone = 'Valid 10-digit phone required';
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) errs.pincode = 'Valid 6-digit pincode required';
    if (!form.address_line.trim()) errs.address_line = 'Address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.state) errs.state = 'State is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) { toast.error('Cart is empty'); return; }

    setSubmitting(true);
    try {
      const { data } = await api.post('/orders', form);
      await fetchCart();
      navigate(`/order-confirmation/${data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to place order. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-state" style={{ background: 'white', borderRadius: 4, padding: '60px 20px' }}>
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty!</h3>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Shop Now</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-heading">Checkout</h2>
        <div className="checkout-grid">
          {/* Delivery Address Form */}
          <form className="checkout-form-card" onSubmit={handleSubmit} noValidate>
            <div className="checkout-section-header">
              <span className="step-badge">1</span>
              <h3>Delivery Address</h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkout-name">Full Name *</label>
                <input id="checkout-name" name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="checkout-phone">Phone Number *</label>
                <input id="checkout-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" maxLength={10} />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="checkout-pincode">Pincode *</label>
                <input id="checkout-pincode" name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit pincode" maxLength={6} />
                {errors.pincode && <span className="form-error">{errors.pincode}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="checkout-city">City *</label>
                <input id="checkout-city" name="city" value={form.city} onChange={handleChange} placeholder="Enter city" />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="checkout-address">Address (House No, Street, Area) *</label>
              <textarea id="checkout-address" name="address_line" value={form.address_line} onChange={handleChange} placeholder="Flat no, building, street, area" rows={3} />
              {errors.address_line && <span className="form-error">{errors.address_line}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="checkout-state">State *</label>
              <select id="checkout-state" name="state" value={form.state} onChange={handleChange}>
                <option value="">Select State</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <span className="form-error">{errors.state}</span>}
            </div>

            <div className="address-type-row">
              <span className="address-type-label">Address Type:</span>
              <label className="addr-type-radio"><input type="radio" name="addr_type" defaultChecked /> Home</label>
              <label className="addr-type-radio"><input type="radio" name="addr_type" /> Work</label>
              <label className="addr-type-radio"><input type="radio" name="addr_type" /> Other</label>
            </div>

            {/* Order Summary in form */}
            <div className="checkout-section-header" style={{ marginTop: '24px' }}>
              <span className="step-badge">2</span>
              <h3>Order Summary</h3>
            </div>

            <div className="order-items-list">
              {cartItems.map(item => {
                const product = item.product;
                if (!product) return null;
                return (
                  <div key={item.id} className="order-item-row">
                    <img src={product.images?.[0]} alt={product.name} className="order-item-img" />
                    <div className="order-item-details">
                      <span className="order-item-name">{product.name}</span>
                      <span className="text-muted text-sm">Qty: {item.quantity}</span>
                    </div>
                    <span className="order-item-price fw-700">
                      ₹{(parseInt(product.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              type="submit"
              className="btn btn-orange btn-lg"
              style={{ width: '100%', marginTop: '24px' }}
              disabled={submitting}
            >
              {submitting ? 'Placing Order...' : `Place Order · ₹${Math.round(total).toLocaleString()}`}
            </button>
          </form>

          {/* Price Summary Sidebar */}
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
                🎉 You save ₹{Math.round(discount).toLocaleString()}!
              </div>
            )}
            <div className="safe-checkout">
              🔒 Safe and Secure Payments. Easy returns. 100% Authentic products.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
