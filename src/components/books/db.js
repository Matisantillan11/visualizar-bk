const connectToDatabase = require("../../database/firebase.js");
const firebase = require("firebase-admin");

connectToDatabase(firebase);

const db = firebase.database();

const addBook = (book) => {
  db.ref("books").push(book);
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

const updateBook = async (bookID, book) => {
  await db.ref("books").child(bookID).update(book);
};

const deleteBook = (bookID) => {
  db.ref("books").child(bookID).remove();
};

module.exports = {
  add: addBook,
  list: getBooks,
  update: updateBook,
  disable: deleteBook,
};
