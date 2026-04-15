const express = require('express');
const cors = require('cors');
require('dotenv').config();

const defaultUser = require('./middleware/defaultUser');
const errorHandler = require('./middleware/errorHandler');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const wishlistRoutes = require('./routes/wishlist');

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Dynamically allow any origin based on the request
    // This is the easiest way to avoid CORS mismatch in production
    callback(null, origin || true);
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default user on every request
app.use(defaultUser);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// Error handler
app.use(errorHandler);

module.exports = app;
