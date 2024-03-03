const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Daan Network API",
      version: "1.0.0",
      description: "Express API",
    },
    servers: [
      {
        url: "http://127.0.0.1:5004",
      },
    ],
  },
  apis: [path.resolve("../src/api/routes/*.js")],
};

const specs = swaggerJsDoc(options);
module.exports = specs;