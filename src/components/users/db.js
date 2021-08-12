const firebase = require("firebase-admin");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = firebase.database();

const createUser = (user) => {
  const hash = bcrypt.hashSync(user.secret, saltRounds);
  user.secret = hash;
  db.ref("users").push(user);
};

const getUser = async (userID) => {
  if (!userID) {
    let users = [];
    await db
      .ref("users")
      .get()
      .then((snapshot) => {
        users = [...users, snapshot.val()];
      });
    return users;
  } else {

    await db
      .ref("users")
      .child(userID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          user = snapshot.val();
        }
      })
      .catch((err) => {
        console.error("[error fetching by id] " + err);
      });

    return user;
  }

};

const updateUser = async (userID, user) => {
  await db.ref("users").child(userID).update(user);
};

const deleteUser = (userID) => {
  db.ref("users").child(userID).remove();
};

module.exports = {
  add: createUser,
  list: getUser,
  update: updateUser,
  remove: deleteUser,
};
