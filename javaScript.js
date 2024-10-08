const myLibrary = [];

const bookCards = document.querySelector("#bookCards");
const page = document.querySelector("#page");

//the sidebar popup functionality
const toggleButton = document.getElementById('toggle-btn');
const sideBar = document.getElementById('sideBar');
let dropDownBtns = sideBar.querySelectorAll(".dropDown-btn");


// i have two options to help me keep track of the books id, use count or rely on myLibrary.length.
function Book(title, author, pages, read, id){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
    this.divCard;
}

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
    
        //storing the divCard of the object inside the object for future use and easy manipulation
        this.divCard = divCard;

        //adding the div to the library
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
        //updates the dom element id;
        myLibrary[i].divCard.querySelector(".id").querySelector(".value").textContent = i;
    }
    return removed;
}


// the buttons functionality
page.addEventListener("click", (e) =>{  

    let target = e.target;
    //console.log(target)
    //to be able to still use form for accessability features
    //if(target.tagName == "BUTTON" || target.parentNode.tagName == "BUTTON"){
        e.preventDefault();
    //}

    //for add Button
    if(target.id == "addButton"){
        let title = document.querySelector("#title");
        let author = document.querySelector("#author");
        let pages = document.querySelector("#pages");
        let read = document.querySelector("#addReadButton");
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
            
            if(target.textContent == "No"){
                myLibrary[idWord.textContent].read = "No";
            }else{
                myLibrary[idWord.textContent].read = "Yes";
            }
        }     
}else if(target.id == "deleteButton"){
    let deleteInput = document.querySelector("#deleteInput");
     //makes sure not invalid id entered
     deleteInput = +(deleteInput.value);
    if( deleteInput < myLibrary.length){
        myLibrary[deleteInput].divCard.remove();
        removeFromLibrary(deleteInput);
        
    }
}
});




//i could have used onclick of the html element itself to call a function for easier implementation
//but i don't know if its a good standard so i used event listener, making it work on event delegation
//was too much a headache because of the child elements inside the buttons so it made it less readable.

dropDownBtns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        console.log("click");
                //if the submenu is closed it means its going to open so to close the other one for ecstatic
                //if(!btn.nextElementSibling.classList.contains('show')){
                  //  closeAllSubMenus();
                //}
                btn.nextElementSibling.classList.toggle('show');
                btn.classList.toggle('rotate');
            
                if(sideBar.classList.contains('close')){
                    sideBar.classList.toggle('close');
                    toggleButton.classList.toggle('close');
                }
    })
})

toggleButton.addEventListener('click', () =>{
    sideBar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
    closeAllSubMenus();
});

//the sidebar popup functionality
function closeAllSubMenus(){
    Array.from(sideBar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    })
}