const books = require("../components/books/network.js");
const users = require("../components/users/network.js");

const routes = (server) => {
  server.use("/api/books", books );
  server.use("/api/users", users );
};

module.exports = routes;
