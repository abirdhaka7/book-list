

class Book{
    constructor(title,author,isbn){

        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
} 
class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr');
    //Insert col
    row.innerHTML = `

    <td><i class="fas fa-book"></i> ${book.title}</td>
    <td><i class="fas fa-user"></i> ${book.author}</td>
    <td><i class="fas fa-barcode"></i> ${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>    
    `;

    list.appendChild(row);
  }
  showAlert(massage, className){
    //Create div
    const div = document.createElement('div');
    //Add class to div
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(massage));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form); 

    //Get disappear after 3s
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000)
  }
  deleteBook(target){
    
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}


//LOcal storeage class
class Store{
  
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  
  
  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      //Add book to UI
      ui.addBookToList(book);
    });
  };

  
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

    
  }
  static removeBook(isbn){

    const books = Store.getBooks();

    books.forEach(function(book, indexOf){
      
      if(book.isbn === isbn){
        books.splice(index, 1);
      }

    });
    localStorage.setItem('books', JSON.stringify(books));

  }
  
}


//Dom load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Event listner add book 
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get all form input values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
        
  //Instantiate Book
  const book = new Book (title, author, isbn);

  //Instantiate UI

  const ui = new UI()

  //Add book to list 

  if( title === '' || author === '' || isbn === ''){
     
    ui.showAlert('Please Fill the empty Filed', 'error');

  }else{
      //Add bool to the list
    ui.addBookToList(book);

    //Add to ls
    Store.addBook(book);
    //Show sucess alert
    ui.showAlert('Book is added to the list', 'success');
    //Clear Fields after one is submit
    ui.clearFields();

  }

  e.preventDefault();
});

//Event listner for delete
document.getElementById('book-list').addEventListener('click',
function(e){

  const ui = new UI();

  ui.deleteBook(e.target);

  // Remove from ls
  
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //console.log(e.target);

  //Show alert
  ui.showAlert('Book is removed', 'success');

  e.preventDefault();
});
