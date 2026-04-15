const express = require('express');
const { Order, OrderItem, CartItem, Product } = require('../models');
const router = express.Router();

// POST /api/orders — place order
router.post('/', async (req, res, next) => {
  try {
    const { name, phone, pincode, address_line, city, state } = req.body;

    const cartItems = await CartItem.findAll({
      where: { user_id: req.userId },
      include: [{ model: Product, as: 'product' }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let subtotal = 0;
    let discount = 0;

    for (const item of cartItems) {
      subtotal += parseFloat(item.product.original_price) * item.quantity;
      discount += (parseFloat(item.product.original_price) - parseFloat(item.product.price)) * item.quantity;
    }

    const delivery_fee = subtotal > 500 ? 0 : 40;
    const total = subtotal - discount + delivery_fee;

    const order = await Order.create({
      user_id: req.userId,
      status: 'PLACED',
      subtotal,
      discount,
      delivery_fee,
      total,
      shipping_name: name,
      shipping_phone: phone,
      shipping_pincode: pincode,
      shipping_address_line: address_line,
      shipping_city: city,
      shipping_state: state,
    });

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product.name,
      product_image: (item.product.images && item.product.images[0]) || '',
      price: item.product.price,
      quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);
    await CartItem.destroy({ where: { user_id: req.userId } });

    const fullOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItem, as: 'items' }],
    });

    res.status(201).json(fullOrder);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders — order history
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.userId },
      include: [{ model: OrderItem, as: 'items' }],
      order: [['placed_at', 'DESC']],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id, user_id: req.userId },
      include: [{ model: OrderItem, as: 'items' }],
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
