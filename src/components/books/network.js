const express = require("express");
const { addBook, getBooks } = require("./db");

const router = express.Router();

router.get("/books", async (req, res) => {
  const books = await getBooks();
  res.status(200).send(books);
});

router.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const book = await getBooks(id);
  res.status(200).send(book);
});

router.post("/books/create", (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    release_date: req.body.release_date,
  };
  addBook(book);
  res.status(200).json(book);
});

module.exports = router;
