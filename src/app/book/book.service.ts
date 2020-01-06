import { Book } from '../book.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookService {
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
  selectedBook: Book;
  selectedBookIndex: number = -1;
  onDataStateChanged = new EventEmitter<void>();
  editMode = false;
  constructor() {}
  getBook(bookIndex) {
    return { ...this.books[bookIndex] };
  }
  selectBook(bookIndex: number) {
    this.selectedBookIndex = bookIndex;
    this.selectedBook = this.books[bookIndex];
    this.onDataStateChanged.emit();
  }
  resetBookSelection() {
    this.selectedBookIndex = -1;
    this.selectedBook = null;
    this.onDataStateChanged.emit();
  }
  startBookEdit() {
    this.editMode = true;
    this.onDataStateChanged.emit();
  }
  cancelBookEdit() {
    this.editMode = false;
    this.onDataStateChanged.emit();
  }
  saveBook(bookIndex: number, modifiedBook: Book) {
    this.editMode = false;
    this.selectedBook = modifiedBook;
    this.books = this.books.map((b, i) => {
      if (i === bookIndex) {
        return { ...modifiedBook };
      }
      return b;
    });
    this.onDataStateChanged.emit();
  }
  deleteBook(bookIndex: number) {
    this.books = this.books.filter((book, idx) => idx !== bookIndex);
    this.selectedBookIndex = -1;
    this.selectedBook = null;
    this.onDataStateChanged.emit();
    // this.onDataStateChanged.error('Error Occured');
    // this.onDataStateChanged.complete();
  }
  addBook() {
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
    this.onDataStateChanged.emit();
  }
}
