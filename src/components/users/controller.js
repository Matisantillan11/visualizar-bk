const { add } = require("./db");

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

module.exports = {
  addUser,
};
