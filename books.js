function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Test data
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
      book.read ? "Already read" : "Not read yet"
    }.`;
  });
};

function run() {
  render(books);
}

// in case the document is already rendered
if (document.readyState != "loading") run();
// modern browsers
else if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", run);
// IE <= 8
else
  document.attachEvent("onreadystatechange", function() {
    if (document.readyState == "complete") run();
  });
