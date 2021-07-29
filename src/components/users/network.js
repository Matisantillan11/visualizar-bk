const express = require("express");
const router = express.Router();

const { addUser, listUser } = require("./controller.js");

router.get("/users", async (req, res) => {
  await listUser()
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(404).send("Error: " + error));
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  await listUser(id)
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(404).send("Error: " + error));
});

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
