function Book(title, author, pages, good) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.good = good;
}

let books = [];

const render = books => {
  // Make an html element and append it to a parent.
  const makeElem = (parent, tag, cssClasses, innerText) => {
    const elem = document.createElement(tag);
    cssClasses.forEach(cssClass => elem.classList.add(cssClass));
    if (innerText) elem.innerText = innerText;
    parent.appendChild(elem);
    return elem;
  };

  const container = document.querySelector("main .container");

  books.forEach((book, index) => {
    const card = makeElem(container, "div", ["card", "text-left", "card-body"]);
    card.setAttribute("data-index", index);

    makeElem(card, "h5", ["card-title"], book.title);

    makeElem(
      card,
      "p",
      ["card-text"],
      `By ${book.author}, ${book.pages} pages. ${
        book.good ? "Would recommend it" : "Wouldn't recommend it"
      }.`
    );

    const deleteBtn = makeElem(
      card,
      "button",
      ["btn", "btn-outline-danger", "btn-sm"],
      "Remove"
    );
    deleteBtn.addEventListener("click", event => {
      const bookIndex = event.target.parentElement.getAttribute("data-index");
      firebase
        .database()
        .ref(`/books/${bookIndex}`)
        .remove() // returns promise
        .then(() => location.reload());
    });
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
};

if (document.readyState != "loading") run();
else if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", run);
else
  document.attachEvent("onreadystatechange", function() {
    if (document.readyState == "complete") run();
  });
