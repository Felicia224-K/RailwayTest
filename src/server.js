require('dotenv').config();
const app = require('./app');

const sequelize = require("./config/database");
require("./models/User");
require("./models/Sensor");


sequelize.sync({ alter: true})
.then(() => console.log("Database synced"))
.catch(err => console.error("Error:", err));

console.log('JWT_SECRET:', process.env.JWT_SECRET);


const PORT = process.env.PORT || 3000;

 
sequelize.sync({ alter: true }) // alter: true met a jour les tables sans les supprimer 
  .then(() => console.log('Base de donnees synchronisee')) 
  .catch(err => console.error('Erreur BDD :', err));

app.listen(PORT,  () => console.log(`Server running on port ${PORT}`));