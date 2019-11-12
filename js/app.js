class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const database = firebase.database()

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

  for (const bookId in books) {
    const book = books[bookId]
    const card = makeElem(container, "div", ["card", "text-left", "card-body"]);
    card.setAttribute("data-index", bookId);

    makeElem(card, "h5", ["card-title"], book.title);

    makeElem(
      card,
      "p",
      ["card-text"],
      `By ${book.author}, ${book.pages} pages. ${
        book.read ? "Already read" : "Not read yet"
      }.`
    );

    const deleteButton = makeElem(
      card,
      "button",
      ["btn", "btn-outline-danger", "btn-sm"],
      "Remove"
    );
    deleteButton.addEventListener("click", event => {
      const bookIndex = event.target.parentElement.getAttribute("data-index");
      database
        .ref(`/books/${bookIndex}`)
        .remove() // returns promise
        .then(() => location.reload());
    });
  };
};

document.getElementById("submitNewBook").addEventListener("click", event => {
  const title = document.getElementById("title").value
  const author = document.getElementById("author").value
  const pages = document.getElementById("pages").value
  const read = document.getElementById("read").checked

  database.ref("/books/").push(new Book(title, author, pages, read))

  location.reload()
});

// Does the same as `$(document).ready()`

const run = () => {
  // render from the database
  database
    .ref("/books/")
    .once("value")
    .then(snap => {
      render(snap.val())
    });
};

if (document.readyState != "loading") run();
else if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", run);
else
  document.attachEvent("onreadystatechange", function() {
    if (document.readyState == "complete") run();
  });
