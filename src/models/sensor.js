const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const sensor = sequelize.define("sensor", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    type: {
        type: DataTypes.ENUM("temperature", "humidity", "light", "pressure"),
        allowNull: false
    },

    value: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },

    unit: {
        type: DataTypes.STRING(10),
        defaultValue: " "
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    
},  {
        tableName: "sensors",
        timestamps: true
});

module.exports = sensor;