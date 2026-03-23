const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("user", {
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

    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password,12);
    });




    const Sensor = require("./sensor");

    User.hasMany(Sensor, { foreignKey: "userId", as: "sensors"});

    Sensor.belongsTo(User, {foreignKey: "userId", as: "owner"});



    module.exports = User;