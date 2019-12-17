import { Component } from '@angular/core';
import { Book } from './book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'library-demo';
  selectedBook: Book;
  selectedBookIndex = -1;
  editMode: boolean = false;
  showlogin = false;
  books: Book[] = [
    {
      title: 'Let us C',
      pages: 500,
      coverImage:
        'https://images-na.ssl-images-amazon.com/images/I/51Z4vZ9aqUL._SX258_BO1,204,203,200_.jpg',
      price: 300,
      author: 'Yashwant Kanitkar',
      description: 'C Fundamentals'
    },
    {
      title: 'Let us C++',
      pages: 500,
      coverImage:
        'https://rukminim1.flixcart.com/image/416/416/jwmfcsw0/book/2/7/5/let-us-c-original-imafgpndjvdz9uvw.jpeg?q=70',
      price: 300,
      author: 'Yashwant Kanitkar',
      description: 'C++ Fundamentals'
    }
  ];

  onBookSelected(bookIndex: number) {
    this.selectedBookIndex = bookIndex;
    this.selectedBook = this.books[bookIndex];
  }
  resetBookSelection() {
    this.selectedBook = null;
  }
  editBook() {
    this.editMode = true;
  }
  deleteBook() {
    this.books = this.books.filter((book, idx) => idx !== this.selectedBookIndex);
    this.selectedBookIndex = -1;
    this.selectedBook = null;
  }
  saveBook(modifiedBook: Book) {
    this.editMode = false;
    this.selectedBook = modifiedBook;
    this.books = this.books.map((b, i) => {
      if (i === this.selectedBookIndex) {
        return { ...modifiedBook };
      }
      return b;
    });
  }
  cancelEdit() {
    this.editMode = false;
  }
  addNewBook() {
    this.selectedBook = {
      title: '',
      pages: 0,
      coverImage: '',
      price: 0,
      author: '',
      description: ''
    };
    this.books = this.books.concat(this.selectedBook);
    this.selectedBookIndex = this.books.length - 1;
    this.editMode = true;
  }
}
