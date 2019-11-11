function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}.`
    }
}


const animalFarm = new Book("Animal Farm", "George Orwell", 120, true)

console.log(animalFarm.info())