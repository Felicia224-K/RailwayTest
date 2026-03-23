const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title:  "CIR IoT API",
            version: "1.0.0",
            description: "API REST pour la gestion des capteurs IoT - Centre Ivorien de Robotique",

        },

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },

    apis: ["./src/routes/*.js"],
};
module.exports = swaggerJsdoc(options);