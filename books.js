function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read ? "already read" : "not read yet"}.`
}

const animalFarm = new Book("Animal Farm", "George Orwell", 120, true)

console.log(animalFarm.info())