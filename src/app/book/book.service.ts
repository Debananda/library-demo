import { Book } from '../book.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BookService {
  books: Book[] = [];
  selectedBook: Book;
  selectedBookIndex: number = -1;
  onDataStateChanged = new EventEmitter<void>();
  editMode = false;
  constructor(private httpClient: HttpClient) {}
  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('https://library-demo-e23d6.firebaseio.com/books.json').pipe(
      map(x => {
        return Object.keys(x).map(key => {
          return { ...x[key], id: key };
        });
      })
    );
  }
  getBook(bookId: string) {
    return this.httpClient
      .get<Book>(`https://library-demo-e23d6.firebaseio.com/books/${bookId}.json`)
      .pipe(
        map(x => {
          return { ...x, id: bookId };
        })
      );
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
  addNewBook(newBook: Book) {
    this.httpClient
      .post('https://library-demo-e23d6.firebaseio.com/books.json', { ...newBook })
      .subscribe(book => {
        console.log(book);
      });
  }
}
