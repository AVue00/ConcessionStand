import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    type ForeignKey,
  } from 'sequelize';
import { User } from './user';

export class Order extends Model<InferAttributes<Order>,InferCreationAttributes<Order>>{
    declare id: CreationOptional<number>
    declare userId: ForeignKey<User['id']>;
}

export function OrderFactory(sequelize: Sequelize): typeof Order {
    Order.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            }
        },
        {   
            tableName: 'orders',
            sequelize,
            timestamps: false,
            underscored: true
        }
    )
    return Order;
}