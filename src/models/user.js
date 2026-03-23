const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const user = sequelize.define("user", {
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: "users",
        timestamps: true
    });

    user.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password,12);
    });


    const sensor = require("./sensor");

    user.hasMany(sensor, { foreignKey: "userId", as: "sensors"});

    sensor.belongsTo(user, {foreignKey: "userId", as: "owner"});

    module.exports = user;