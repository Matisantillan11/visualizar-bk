const express = require("express");

const dotenv = require("dotenv");
dotenv.config("/.env");

/*Initialzing packages*/
const router = require("../network/routes.js");

/*setting server */
const app = express();
app.set("port", process.env.PORT || 3001);
app.use(express.json());

/* routes */
router(app);

/*starting server */
app.listen(app.get("port"), () =>
  console.log(`server on port: ${app.get("port")}`)
);
