const express = require("express");

const router = express.Router();

const books = [
  {
    id: 1,
    title: "Harry Potter y la piedra filosofal",
    author: "J. K. Rowling",
    release_date: "06-26-1997",
  },
  {
    id: 2,
    title: "Harry Potter y la cámara secreta",
    author: "J. K. Rowling",
    release_date: "07-02-1998",
  },
];

router.get("/books", (req, res) => {
  res.json(books);
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === Number(id));

  res.json(book);
});

module.exports = router;
