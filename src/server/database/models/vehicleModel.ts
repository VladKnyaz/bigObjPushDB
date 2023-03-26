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
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        speed: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        traction: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        braking: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        acceleration: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    // отключение когда был создан/обновлён
    { timestamps: false },
);
