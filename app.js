function Book(title, author, pages, good) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.good = good;
}

let books = [];

const render = books => {
  // Make an html element and append it to a parent.
  const makeElem = (parent, tag, cssClasses) => {
    const elem = document.createElement(tag);
    cssClasses.forEach(cssClass => elem.classList.add(cssClass));
    parent.appendChild(elem);
    return elem;
  };

  const container = document.querySelector("main .container");

  books.forEach(book => {
    const card = makeElem(container, "div", ["card", "text-left", "card-body"]);

    const title = makeElem(card, "h5", ["card-title"]);
    title.innerText = book.title;

    const text = makeElem(card, "p", ["card-text"]);
    text.innerText = `By ${book.author}, ${book.pages} pages, ${
      book.good ? "Would recommend it" : "Wouldn't recommend it"
    }.`;
  });
};

// Does the same as `$(document).ready()`

const run = () => {
  // render from the database
  firebase
    .database()
    .ref("/books/")
    .once("value")
    .then(snap => render(snap.val()));
}

if (document.readyState != "loading") run();
else if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", run);
else
  document.attachEvent("onreadystatechange", function() {
    if (document.readyState == "complete") run();
  });
