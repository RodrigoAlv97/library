const mainContainer = document.querySelector("#mainContainer");
const main = document.querySelector("#main");
const titleF = document.querySelector("#titleF");
const authorF = document.querySelector("#authorF");
const pagesF = document.querySelector("#pagesF");
const readF = document.querySelector("#readF");
const btnAdd = document.querySelector(".btnAdd");
const btnCancel = document.querySelector(".btnCancel");
const form = document.querySelector("#form");
const formBg = document.querySelector("#formBg");
const btnNewBook = document.querySelector("#btnNewBook");
const totalBooks = document.querySelector(".totalBooks");
const readBooks = document.querySelector(".readBooks");
const notReadBooks = document.querySelector(".notReadBooks");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readStatus = function () {
  let value = "";
  value = value + this.read;
  return value;
};

function addBookToLibray(title, author, pages, read) {
  title = titleF.value;
  author = authorF.value;
  pages = pagesF.value;

  if (readF.checked == true) {
    read = true;
  } else {
    read = false;
  }

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);
  reload();
  hideForm();
  clearForm();
}

//Create card for every Book object

function createCard(element) {
  const cardContainer = document.createElement("div");
  cardContainer.setAttribute("class", "cardContainer");
  cardContainer.setAttribute("data", `${myLibrary.indexOf(element)}`);
  main.appendChild(cardContainer);

  const cardTitle = document.createElement("div");
  cardTitle.setAttribute("class", "cardItem cardTitle");
  cardTitle.textContent = element.title;
  cardContainer.appendChild(cardTitle);

  const cardAuthor = document.createElement("div");
  cardAuthor.setAttribute("class", "cardItem cardAuthor");
  cardAuthor.textContent = "By: " + element.author;
  cardContainer.appendChild(cardAuthor);

  const cardPages = document.createElement("div");
  cardPages.setAttribute("class", "cardItem cardPages");
  cardPages.textContent = "Pages: " + element.pages;
  cardContainer.appendChild(cardPages);

  const cardReadStatus = document.createElement("div");
  cardReadStatus.setAttribute("class", "cardItem cardReadStatus");
  cardReadStatus.textContent = "Read: " + element.readStatus();
  cardContainer.appendChild(cardReadStatus);

  const cardButtons = document.createElement("div");
  cardButtons.setAttribute("class", "cardItem cardButtons");

  const btnReadStatus = document.createElement("button");
  btnReadStatus.setAttribute("class", "btnCard btnReadStatus");
  if (element.readStatus() == "true") {
    btnReadStatus.textContent = "Not read";
  } else {
    btnReadStatus.textContent = "Read";
  }

  btnReadStatus.addEventListener("click", function () {
    if (element.read == true) {
      element.read = false;
      btnReadStatus.textContent = "Read";
    } else if (element.read == false) {
      element.read = true;
      btnReadStatus.textContent = "Not read";
    }
    cardReadStatus.textContent = "Read: " + element.readStatus();
    libraryInfo();
  });

  cardButtons.appendChild(btnReadStatus);

  const btnDelete = document.createElement("button");
  btnDelete.setAttribute("class", "btnCard btnDelete");
  btnDelete.textContent = "Delete";

  function deleteBook() {
    let value = cardContainer.getAttribute("data");
    myLibrary.splice(value, 1);
    reload();
  }

  btnDelete.addEventListener("click", deleteBook);
  cardButtons.appendChild(btnDelete);

  cardContainer.appendChild(cardButtons);
}

btnNewBook.addEventListener("click", showForm);

btnAdd.addEventListener("click", addBookToLibray);

btnCancel.addEventListener("click", cancelAdd);

function clearForm() {
  titleF.value = "";
  authorF.value = "";
  pagesF.value = "";
  readF.checked = false;
}

function hideForm() {
  formBg.style.display = "none";
}

function showForm() {
  formBg.style.display = "inline";
}

function cancelAdd() {
  clearForm();
  hideForm();
}

function showBooks() {
  myLibrary.forEach((element) => createCard(element));
}

function reload() {
  main.replaceChildren();
  libraryInfo();
  showBooks();
}

function libraryInfo() {
  let total = 0;
  let readBook = 0;
  let notReadBook = 0;

  myLibrary.forEach((element) => {
    if (element.read == true) {
      total = total + 1;
      readBook = readBook + 1;
    } else {
      total = total + 1;
      notReadBook = notReadBook + 1;
    }
  });

  totalBooks.textContent = "Total Books: " + total;
  readBooks.textContent = "Read Books: " + readBook;
  notReadBooks.textContent = "Not Read Books: " + notReadBook;
}

hideForm();
libraryInfo();
