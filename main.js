const form = document.getElementById("book-form");
const dialog = document.getElementById("book-dialog");
const Title = document.getElementById("title");
const Author = document.getElementById("author");
const Pages = document.getElementById("pages");
const Read = document.getElementById("read");
const addBookBtn = document.getElementById("add-book-btn");
const cancelBtn = document.getElementById("cancel-btn");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});







form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dialog = document.getElementById("book-dialog");
  dialog.showModal();   

  const title = Title.value;
  const author = Author.value;
  const pages = Pages.value;
  const read = Read.value ;

  


  addBookToLibrary(title, author, pages, read);
  form.reset();
});

const myLibrary = [];

function Book(title, author, pages , read) {

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID(); 
}

function addBookToLibrary(title, author, pages, read) {

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks()
}

function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("data-id", book.id);
    bookDiv.classList.add("book-card");

    const title = document.createElement("h3");
    title.textContent = book.title;
    bookDiv.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    bookDiv.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    bookDiv.appendChild(pages);

    const readStatus = document.createElement("p");
    readStatus.textContent = `Read: ${book.read ? "Yes" : "No"}`;
    bookDiv.appendChild(readStatus);

    const buttonDiv = document.createElement("div");
    bookDiv.appendChild(buttonDiv);
    buttonDiv.classList.add("book-buttons");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeBook(book.id);
    });
    buttonDiv.appendChild(removeBtn);

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = "Toggle Read";
    toggleReadBtn.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });
    buttonDiv.appendChild(toggleReadBtn);

    bookList.appendChild(bookDiv);
  });
}

function removeBook(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}       

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

addBookToLibrary("The Hobbit", "Tolkien", 310, false);
addBookToLibrary("1984", "Orwell", 328, true);