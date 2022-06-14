const main = document.querySelector('#main');
const titleF = document.querySelector('#titleF');
const authorF = document.querySelector('#authorF');
const pagesF = document.querySelector('#pagesF');
const readF = document.querySelector('#readF');
const btnAdd = document.querySelector('.btnAdd');

let myLibrary = [];

// Book Object Constructor

function Book(title , author , pages , read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read   
}

//Return book read status

Book.prototype.readStatus = function () {
    let value = ""
    value = value+this.read
    return value
}

// Create new Book Object + add to myLibrary

function addBookToLibray(title , author , pages , read){
    title = titleF.value;
    author = authorF.value;
    pages = pagesF.value;
    
    if (readF.checked == true) {
        read = true;
    } else {
        read = false;
    }

    const book = new Book(title , author , pages , read);

    myLibrary.push(book);
    reload();
}

//Create card for every Book object

function createCard(element){
    
    const cardContainer = document.createElement('div');
    cardContainer.setAttribute('class' , 'cardContainer');
    cardContainer.setAttribute('data' , `${myLibrary.indexOf(element)}`);
    main.appendChild(cardContainer);

    const cardTitle = document.createElement('div');
    cardTitle.setAttribute('class' , 'cardItem cardTitle');
    cardTitle.textContent = element.title;
    cardContainer.appendChild(cardTitle);

    const cardAuthor = document.createElement('div');
    cardAuthor.setAttribute('class' , 'cardItem cardAuthor');
    cardAuthor.textContent = 'By: '+ element.author;
    cardContainer.appendChild(cardAuthor);

    const cardPages = document.createElement('div');
    cardPages.setAttribute('class' , 'cardItem cardPages');
    cardPages.textContent = 'Pages: ' + element.pages;
    cardContainer.appendChild(cardPages);

    const cardReadStatus = document.createElement('div');
    cardReadStatus.setAttribute('class' , 'cardItem cardReadStatus');
    cardReadStatus.textContent = "Read: "+ element.readStatus();
    cardContainer.appendChild(cardReadStatus);

    const cardButtons = document.createElement('div');
    cardButtons.setAttribute('class' , 'cardItem cardButtons');

    const btnReadStatus = document.createElement('button');
    btnReadStatus.setAttribute('class' , 'btnCard btnReadStatus');
    if (element.readStatus() == 'true') {
        btnReadStatus.textContent = 'Not read';
    } else {
        btnReadStatus.textContent = 'Read'
    }
    btnReadStatus.addEventListener('click' , function() {
        if (element.read == true) {
            element.read = false
            btnReadStatus.textContent = 'Read'   
         } else if(element.read == false) {
             element.read = true
             btnReadStatus.textContent = 'Not read';
         }
         cardReadStatus.textContent = "Read: "+ element.readStatus();
    })
    cardButtons.appendChild(btnReadStatus);

    const btnDelete = document.createElement('button');
    btnDelete.setAttribute('class' , 'btnCard btnDelete');
    btnDelete.textContent = 'Delete'
    btnDelete.addEventListener('click' , deleteBook);
    cardButtons.appendChild(btnDelete);

    cardContainer.appendChild(cardButtons);
}


//Show Book object data in cards

function showBooks(){
    myLibrary.forEach(element => createCard(element))
}

//reload main div

function reload(){
    main.replaceChildren();
    showBooks();
}

// delete book
function deleteBook(){
    const cardCont = document.querySelector('.cardContainer')
    let value = cardCont.getAttribute('data');
    myLibrary.splice(value , 1);
    reload();
}    

// Add book btn
btnAdd.addEventListener('click' , addBookToLibray);

showBooks();
