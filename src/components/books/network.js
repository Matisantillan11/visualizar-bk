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
  const books = [];
  db.ref("books").on("value", (snapshot) => {
    res.send(books.concat(snapshot.val()));
  });
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;

  db.ref("books")
    .child(id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        const book = snapshot.val();
        res.send(book);
      } else {
        res.status(404);
      }
    })
    .catch((err) => {
      console.error("[error fetching by id] " + err);
    });
});

router.post("/books/create", (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    release_date: req.body.release_date,
  };
  db.ref("books").push(book);
  res.status(200).json(book);
});

module.exports = router;
