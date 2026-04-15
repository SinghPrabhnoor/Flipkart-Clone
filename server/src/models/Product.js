const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  original_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 100 },
  rating: { type: DataTypes.DECIMAL(3, 1), defaultValue: 4.0 },
  rating_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  brand: { type: DataTypes.STRING(100) },
  images: { type: DataTypes.JSONB, defaultValue: [] },
  specifications: { type: DataTypes.JSONB, defaultValue: {} },
  highlights: { type: DataTypes.JSONB, defaultValue: [] },
  is_assured: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'products', timestamps: true, createdAt: 'created_at', updatedAt: false });

module.exports = Product;
