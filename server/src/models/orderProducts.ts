import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    DataTypes,
    type Sequelize,
  } from 'sequelize';

  export class OrderProducts extends Model<InferAttributes<OrderProducts>,InferCreationAttributes<OrderProducts>>{
    declare quantity: number;
  }

  export function OrderProductsFactory(sequelize: Sequelize): typeof OrderProducts {
    OrderProducts.init(
        {
            quantity: {
                type: DataTypes.INTEGER
            },
        },{
            tableName: 'order_products',
            sequelize,
            timestamps: false,
            underscored: true
        } 
    )
    return OrderProducts;
  }