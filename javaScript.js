const myLibrary = [];
const myLibraryElements = [];

const bookCards = document.querySelector("#bookCards");


// i have two options to help me keep track of the books id, use count or rely on myLibrary.length.
function Book(title, author, pages, read, id){
    // Book.count ++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}
// Book.count = 0;

Book.prototype.info = function(){
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read + " read";
};

Book.prototype.display = function(){
        // now the html elements creation
        let divCard = document.createElement("div");
        divCard.className = "card";
        //title element
        divCard.appendChild(addToCard("title","Title: ", this.title));
        //author element
        divCard.appendChild(addToCard("author","Author: ", this.author));
        //pages element
        divCard.appendChild(addToCard("pages","Pages: ", this.pages));
        //read button
        let div = document.createElement("div");
        div.className = "read";
    
        let wordSpan = document.createElement('span');
        wordSpan.textContent = "Read: ";
        wordSpan.className = "cardStrong";
    
        let valueSpan = document.createElement('button');
        valueSpan.textContent = this.read;
        valueSpan.className = "readButton";
    
        div.appendChild(wordSpan);
        div.appendChild(valueSpan);
    
        divCard.appendChild(div);
        //id element
        divCard.appendChild(addToCard("id", "Book Id: ", this.id))
    
        myLibraryElements.push(divCard);
        bookCards.appendChild(divCard);

};

function addToCard(name, word, value){
    let div = document.createElement("div");
    div.className = name;

    let wordSpan = document.createElement('span');
    wordSpan.textContent = word;
    wordSpan.className = "cardStrong";

    let valueSpan = document.createElement('span');
    valueSpan.textContent = value;
    valueSpan.className = "value";

    div.appendChild(wordSpan);
    div.appendChild(valueSpan);
    return div;
}


function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read, myLibrary.length));
    myLibrary[myLibrary.length - 1].display();
}

function removeFromLibrary(id){
    let removed = myLibrary.splice(id, 1);
    for(let i = 0; i < myLibrary.length; i++){
        myLibrary[i].id = i;
    }
    // Book.count --;
    return removed;
}

// the read button funcitonality