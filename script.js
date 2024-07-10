import { library } from "./data.js";

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function (read) {
  this.read = !read;
};

Book.prototype.convertToHTML = function (index) {
  return `      
        <div class="book-container" >
          <div class="book">
            <div>
              <div class="title">${this.title}</div>
              <div class="author">By ${this.author}</div>
            </div>
            <div class="pages">${this.pages} pages</div>
          </div>
          <div class="buttons" id="${index}">
            <button class="delete-button" >Delete</button>
            <button class="read-button">${
              this.read ? "Read" : "Not read yet"
            } </button>
          </div>
        </div>`;
};

function updateLibrary() {
  let htmlString = "";
  myLibrary.forEach((book, index) => {
    htmlString += book.convertToHTML(index);
  });

  document.querySelector(".library").innerHTML = htmlString;

  // Edit listeners
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      myLibrary.splice(button.parentElement.id, 1);
      updateLibrary();
    });
  });

  document.querySelectorAll(".read-button").forEach((button) => {
    button.addEventListener("click", () => {
      myLibrary[button.parentElement.id].toggleRead(
        myLibrary[button.parentElement.id].read
      );
      updateLibrary();
    });
  });
}

// main //

// convert to Book objects
const myLibrary = library.reduce((bookList, book) => {
  const newObj = new Book(book.title, book.author, book.pages, book.read);
  bookList.push(newObj);
  return bookList;
}, []);

// Listeners
document.querySelector(".new-book").addEventListener("click", () => {
  document.querySelector(".modal").showModal();
});
document.querySelector(".close-button").addEventListener("click", () => {
  document.querySelector(".modal").close();
});
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.submit();

  const book = new Book(
    form.elements["title"].value,
    form.elements["author"].value,
    form.elements["pages"].value,
    form.elements["read"].checked
  );

  myLibrary.push(book);
  updateLibrary();
  form.reset();
});

// First loadout
updateLibrary();
