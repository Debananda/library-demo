import { Book } from '../book.model';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookService {
  books: Book[];
  selectedBook: Book;
  selectedBookIndex: number = -1;
  onDataStateChanged = new EventEmitter<void>();
  editMode = false;
  constructor() {
    this.books = [
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
  }
  selectBook(bookIndex: number) {
    this.selectedBookIndex = bookIndex;
    this.selectedBook = this.books[bookIndex];
    this.onDataStateChanged.emit();
  }
  startBookEdit() {
    this.editMode = true;
    this.onDataStateChanged.emit();
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
    this.onDataStateChanged.emit();
  }
}
