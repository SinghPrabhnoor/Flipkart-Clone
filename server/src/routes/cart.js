const express = require('express');
const { CartItem, Product, Category } = require('../models');
const router = express.Router();

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const items = await CartItem.findAll({
      where: { user_id: req.userId },
      include: [{
        model: Product,
        as: 'product',
        include: [{ model: Category, as: 'category', attributes: ['name'] }],
      }],
      order: [['created_at', 'DESC']],
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// POST /api/cart — add item
router.post('/', async (req, res, next) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let item = await CartItem.findOne({ where: { user_id: req.userId, product_id } });
    if (item) {
      item.quantity = item.quantity + parseInt(quantity);
      await item.save();
    } else {
      item = await CartItem.create({ user_id: req.userId, product_id, quantity });
    }

    const fullItem = await CartItem.findByPk(item.id, {
      include: [{ model: Product, as: 'product' }],
    });
    res.status(201).json(fullItem);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cart/:id — update quantity
router.put('/:id', async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findOne({ where: { id: req.params.id, user_id: req.userId } });
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    if (parseInt(quantity) <= 0) {
      await item.destroy();
      return res.json({ message: 'Item removed' });
    }

    item.quantity = parseInt(quantity);
    await item.save();
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart/:id — remove item
router.delete('/:id', async (req, res, next) => {
  try {
    const item = await CartItem.findOne({ where: { id: req.params.id, user_id: req.userId } });
    if (!item) return res.status(404).json({ error: 'Cart item not found' });
    await item.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cart — clear entire cart
router.delete('/', async (req, res, next) => {
  try {
    await CartItem.destroy({ where: { user_id: req.userId } });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
