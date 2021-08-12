const { add, list, update, remove } = require("./db");

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


const updateUser = (userID, user ) => {
  return new Promise((res, rej) => {
    if (!userID || user){
      rej("[error controller] update user");
    } else {
      res(update(userID, user));
    }
  })
};

const deleteUser = (userID) =>{
  return new Promise((res, rej) => {
    if(!userID){
      rej("[error controller] delete user")
    }else{
      res(remove(userID));
    }
  })
  
};


module.exports = {
  addUser,
  listUser,
  updateUser,
  deleteUser
};
