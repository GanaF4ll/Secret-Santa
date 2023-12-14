const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Secret Santa",
      version: "1.0.0",
      description: "Manages users and groups, hopefully",
    },
  },
  apis: ["./routes/userRoute.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
