const myLibrary = [];

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

};

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read, myLibrary.length));
}

function removeFromLibrary(id){
    let removed = myLibrary.splice(id, 1);
    for(let i = 0; i < myLibrary.length; i++){
        myLibrary[i].id = i;
    }
    // Book.count --;
    return removed;
}
