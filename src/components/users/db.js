const firebase = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = firebase.database();

const createUser = (user) => {
  bcrypt.hash(user.secret, saltRounds, (err, hash) => {
    user.secret = hash;
    db.ref("users").set(user);
  });
};

module.exports = {
  add: createUser,
};
