const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

/*Initialzing packages*/
const app = express();
const router = require("../network/routes.js");

/*setting server */
dotenv.config("/.env");

app.set("port", process.env.PORT || 3001);
app.use(express.json());

/* routes */
router(app);

/*starting server */
app.listen(app.get("port"), () =>
  console.log(`server on port: ${app.get("port")}`)
);
