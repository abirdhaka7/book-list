//Book Constructor

function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor

function UI(){}
  
UI.prototype.addBookToList = function(book){
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
  //<i class="fas fa-trash-alt"></i>
           
//Show alert
UI.prototype.showAlert = function(massage, className){
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

//Delete book

UI.prototype.deleteBook = function(target){

  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}
  //Clear input fields
  UI.prototype.clearFields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }



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

  //console.log(e.target);

  //Show alert
  ui.showAlert('Book is removed', 'success');

  e.preventDefault();
});
