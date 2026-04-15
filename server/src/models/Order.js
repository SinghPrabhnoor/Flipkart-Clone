const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  address_id: { type: DataTypes.INTEGER },
  status: {
    type: DataTypes.ENUM('PLACED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'),
    defaultValue: 'PLACED',
  },
  subtotal: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  delivery_fee: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  shipping_name: { type: DataTypes.STRING(100) },
  shipping_phone: { type: DataTypes.STRING(15) },
  shipping_pincode: { type: DataTypes.STRING(10) },
  shipping_address_line: { type: DataTypes.TEXT },
  shipping_city: { type: DataTypes.STRING(100) },
  shipping_state: { type: DataTypes.STRING(100) },
}, { tableName: 'orders', timestamps: true, createdAt: 'placed_at', updatedAt: 'updated_at' });

module.exports = Order;
