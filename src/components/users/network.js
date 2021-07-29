const express = require("express");
const router = express.Router();

const { addUser } = require("./controller.js");
router.post("/users", async (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    secret: req.body.secret,
  };

  await addUser(user)
    .then(() => res.status(200).send(user))
    .catch((error) => console.log("Error: " + error));
});

module.exports = router;
