const myLibrary = [];
const myLibraryElements = [];

const bookCards = document.querySelector("#bookCards");
const page = document.querySelector("#page");


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


// the buttons funcitonality
page.addEventListener("click", (e) =>{
    
    let target = e.target;
    console.log(target)

    //for add Button
    if(target.id == "addButton"){
        console.log("add click");
        let title = document.querySelector("#title");
        let author = document.querySelector("#author");
        let pages = document.querySelector("#pages");
        let read = document.querySelector("#addReadButton");
        console.log(title);
        addBookToLibrary(title.value, author.value, pages.value, read.textContent);
        title.value = "";
        author.value = "";
        pages.value = "";
        read.textContent = "No"

    //readButton
    }else if(target.className == "readButton"){
        if(target.textContent == "No"){
            target.textContent = "Yes";
        }else{
            target.textContent = "No";
        }

        if(target.id != "addReadButton"){
            let parent = target.parentNode.parentNode;
            let idWord = parent.querySelector(".id").querySelector(".value");
            console.log(idWord);
            
            if(target.textContent == "No"){
                myLibrary[idWord.textContent].read = "No";
            }else{
                myLibrary[idWord.textContent].read = "Yes";
            }
            console.log(myLibrary[idWord.textContent]);
        }


        
}
});