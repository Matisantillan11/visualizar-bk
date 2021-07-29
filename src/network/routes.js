const books = require("../components/books/network.js");
const users = require("../components/users/network.js");

const routes = (server) => {
  server.use("/api", users);
};

module.exports = routes;
