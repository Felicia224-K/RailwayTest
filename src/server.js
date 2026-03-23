require('dotenv').config();
const app = require('./app');

const sequelize = require("./config/database");
require("./models/user");
require("./models/sensor");


sequelize.sync({ alter: true})
.then(() => console.log("Database synced"))
.catch(err => console.error("Error:", err));

console.log('JWT_SECRET:', process.env.JWT_SECRET);


const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));