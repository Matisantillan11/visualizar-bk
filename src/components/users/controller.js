const { add, list } = require("./db");

const addUser = (user) => {
  return new Promise((res, rej) => {
    if (!user) {
      console.error("[error post user] invalid request or user not found");
      rej("invalid request");
    } else {
      res(add(user));
    }
  });
};

const listUser = (userID) => {
  return new Promise((res, rej) => {
    if (!userID) {
      res(list());
    } else {
      res(list(userID));
    }

    rej("[error controller] list user");
  });
};
module.exports = {
  addUser,
  listUser,
};
