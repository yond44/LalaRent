import { Sequelize } from "sequelize";
import db from "../config/database.js";


const { DataTypes } = Sequelize;

const products = db.define('products', {
    user_id:{
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' }
    },
    tipe_property:{
        type: DataTypes.STRING
    },
    city:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    building_area:{
        type: DataTypes.STRING
    },
    bedrooms:{
        type: DataTypes.INTEGER
    },
    bathrooms:{
        type: DataTypes.INTEGER
    },
    price:{
        type: DataTypes.BIGINT
    },
    image:{
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    },


}, {freezeTableName: true, createdAt: false, updatedAt: false});


export default products