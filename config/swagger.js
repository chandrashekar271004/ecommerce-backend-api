const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce Backend API",
      version: "1.0.0",
      description: "Production-style e-commerce backend"
    },
    servers: [
      {
        url: "https://ecommerce-backend-q0jj.onrender.com"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);