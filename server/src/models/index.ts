import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { ProductFactory } from './product.js';
import { OrderFactory } from './order.js';
import { OrderProductsFactory } from './orderProducts.js';
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
      logQueryParameters:true
    });

const User = UserFactory(sequelize);
const Product = ProductFactory(sequelize);
const Order = OrderFactory(sequelize);
const OrderProducts = OrderProductsFactory(sequelize);

User.hasMany(Order,{as: 'orders'});
Order.belongsTo(User);

Product.belongsToMany(Order, { through: OrderProducts });
Order.belongsToMany(Product, { through: OrderProducts });


export {sequelize};