import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const users = db.define('users', {
    username:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.TEXT
    },
    phone_number:{
        type: DataTypes.BIGINT
    },
    address:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.TEXT
    },
    join_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
}, {freezeTableName: true, createdAt: false, updatedAt: false});


export default users