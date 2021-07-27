const books = require("../components/books/network.js");

const routes = (server) => {
  server.use("/api", books);
};

module.exports = routes;
