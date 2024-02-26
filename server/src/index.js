const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectToMongo = require("./config/DatabaseConfig");
connectToMongo();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const specs = require("../src/config/swagger/index");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.set("view engine","ejs");

const PORT = process.env.PORT || 5004;

// use express router
app.use("/", require("./api/routes"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in running the server on port ${PORT}`);
    return;
  }
  console.log(`Server started successfully at port number ${PORT}`);
});
