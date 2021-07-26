const express = require("express");
require("dotenv").config("/.env");

/*Initialzing packages*/
const app = express();

/*setting server */
app.set("port", process.env.PORT || 3001);

/* routes */
app.get("/", (req, res) => {
  res.send("Hello from GET");
});

app.get("/api", (req, res) => {
  res.json({ api: "works!" });
});

/*starting server */
app.listen(app.get("port"), () =>
  console.log(`server on port: ${app.get("port")}`)
);
