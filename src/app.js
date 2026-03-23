const express = require("express");
require("dotenv").config();



const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");

const app = express();



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));




app.use(helmet());

app.use(cors({origin: process.env.FRONTEND_URL || "*"}));

app.use(morgan("dev"));

app.use(logger);

app.use(express.json());



const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const sensorsRouter = require("./routes/sensors");
app.use("/api/sensors", sensorsRouter);



app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});



app.use((req, res) => {
  res.status(404).json({ success: false, error: `Route ${req.url} not found` });
});


const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);




module.exports = app;