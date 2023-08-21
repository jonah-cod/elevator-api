require("dotenv").config();
const express = require("express");
const { router } = require("./routes/routes");
const { db_middleware } = require("./middlewares/db_middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("./swagger.json");

const app = express();

const baseurl = "/api/elevators";
/**
 *allow json & url encoded payloads
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * mount middlewares
 */
app.use(db_middleware);

/**
 * mount routes
 */
app.use(baseurl, router);

/**
 * mount swagger
 */
app.use(
  baseurl + "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDefinition),
);

app.listen(2020, () => {
  // setInterval(() => {
  //   console.log("running");
  // }, 1000);
  console.log("Server running on PORT 2020");
});
