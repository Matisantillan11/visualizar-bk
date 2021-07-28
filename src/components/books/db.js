const connectToDatabase = require("../../database/firebase.js");
const firebase = require("firebase-admin");

connectToDatabase(firebase);

const db = firebase.database();

const addBook = (book) => {
  db.ref("books").set(book);
};

const getBooks = async (bookID) => {
  let book = {};
  if (bookID !== undefined) {
    console.log("entre!");
    await db
      .ref("books")
      .child(bookID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          book = snapshot.val();
          return book;
        }
      })
      .catch((err) => {
        console.error("[error fetching by id] " + err);
      });
  } else {
    console.log(" no entre!");
    let books = [];
    await db
      .ref("books")
      .get()
      .then((snapshot) => {
        books = [...books, snapshot.val()];
      });
    return books;
  }
};

module.exports = {
  addBook,
  getBooks,
};
