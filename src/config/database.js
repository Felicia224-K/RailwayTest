
const {Sequelize} = require("sequelize");

if (!process.env.DATABASE_URL) {
    throw new Error("DARABASE_URL is not set");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    dialectOptions: {
        ssl: process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false}
        : false,
    },
});

module.exports = sequelize;