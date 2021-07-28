const { add, list, update } = require("./db");

const addBook = (book) => {
  return new Promise((res, rej) => {
    if (!book) {
      console.error("[book error controller] Invalid request, book not found");
      rej("invalid data provided");
    } else {
      const bookInfo = {
        title: book.title,
        author: book.author,
        release_date: book.release_date,
      };

      res(add(bookInfo));
    }
  });
};

const listBooks = (bookID) => {
  return new Promise((res, rej) => {
    if (bookID !== undefined) {
      res(list(bookID));
    } else {
      res(list());
    }

    console.error("[Error getting books] Invalid request");
    rej("invalid request");
  });
};

const updateBook = (bookID, book) => {
  return new Promise((res, rej) => {
    if (!bookID || !book) {
      console.error("[Error updating books] Invalid request");
      rej("Invalid request");
    } else {
      res(update(bookID, book));
    }
  });
};

module.exports = {
  addBook,
  listBooks,
  updateBook,
};
