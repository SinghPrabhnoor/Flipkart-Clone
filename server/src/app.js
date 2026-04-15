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
  origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL],
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
