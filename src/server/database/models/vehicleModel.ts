import { DataTypes } from 'sequelize';
import sequelize from '../index';

export const VehicleDb = sequelize.define(
    'Vehicle',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        hash: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        speed: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
        },
        traction: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
        },
        braking: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
        },
        acceleration: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: false,
        },
    },
    // отключение когда был создан/обновлён
    { timestamps: false },
);
