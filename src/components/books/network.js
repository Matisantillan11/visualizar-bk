const express = require("express");
const connectToDatabase = require("../../database/firebase.js");
const firebase = require("firebase-admin");

const router = express.Router();

const serviceAccount = require("../../../visualizar-app-firebase-adminsdk.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.DBURL,
});

const db = firebase.database();

router.get("/books", (req, res) => {
  res.json(books);
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === Number(id));

  res.json(book);
});

router.post("/books/create", (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    release_date: req.body.release_date,
  };
  db.ref("books").push(book);
  res.status(204).json(book);
});

module.exports = router;
