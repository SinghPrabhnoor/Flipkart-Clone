const express = require('express');
const { Wishlist, Product, Category } = require('../models');
const router = express.Router();

// GET /api/wishlist
router.get('/', async (req, res, next) => {
  try {
    const items = await Wishlist.findAll({
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

// POST /api/wishlist
router.post('/', async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const existing = await Wishlist.findOne({ where: { user_id: req.userId, product_id } });
    if (existing) return res.status(400).json({ error: 'Already in wishlist' });

    const item = await Wishlist.create({ user_id: req.userId, product_id });
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    await Wishlist.destroy({ where: { user_id: req.userId, product_id: req.params.productId } });
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
