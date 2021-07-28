const express = require("express");
const { add, list } = require("./db");
const { addBook, listBooks, updateBook } = require("./controller");
const router = express.Router();

router.get("/books", async (req, res) => {
  await listBooks()
    .then((books) => res.status(200).send(books))
    .catch((error) => res.status(404).send("Error: " + error));
});

router.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  await listBooks(id)
    .then((book) => res.status(200).send(book))
    .catch((error) => res.status(404).send("Error: " + error));
});

router.post("/books/create", async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    release_date: req.body.release_date,
  };

  await addBook(book)
    .then(() => res.status(200).send(book))
    .catch((error) => res.status(404).send("Error: " + error));
});

router.put("/books/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, release_date } = req.body;
  const book = {
    title,
    author,
    release_date,
  };

  await updateBook(id, book)
    .then(() => res.status(200).send(book))
    .catch((error) => res.status(404).send("Error: " + error));
});

module.exports = router;
