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
    await db
      .ref("books")
      .child(bookID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          book = snapshot.val();
        }
      })
      .catch((err) => {
        console.error("[error fetching by id] " + err);
      });
    return book;
  } else {
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
  add: addBook,
  list: getBooks,
};
