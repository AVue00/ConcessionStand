import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface ProductAttributes {
    id: number;
    name: string;
    pricePerUnit: number;
    supply: number;
    img_url: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'>{}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public pricePerUnit!: number;
    public supply!: number;
    public img_url!: string;
}

export function ProductFactory(sequelize: Sequelize): typeof Product{
    Product.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull:false,
            },
            pricePerUnit: {
                type: DataTypes.INTEGER,
                allowNull:false,
            },
            supply: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
            img_url: {
                type: DataTypes.STRING,
                allowNull:false
            }
        },
        {
            tableName: 'products',
            timestamps:false,
            sequelize
        }
    );
    return Product;
}