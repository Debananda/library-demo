import { Book } from '../book.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

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
  getBook(bookId: string): Observable<Book> {
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
  saveBook(bookId: string, modifiedBook: Book): Observable<Book> {
    this.editMode = false;
    this.selectedBook = modifiedBook;
    return this.httpClient
      .put<Book>(`https://library-demo-e23d6.firebaseio.com/books/${bookId}.json`, {
        ...modifiedBook
      })
      .pipe(
        tap(() => {
          this.onDataStateChanged.emit();
        })
      );
  }
  deleteBook(bookId: string) {
    this.books = this.books.filter(book => book.id !== bookId);
    this.selectedBookIndex = -1;
    this.selectedBook = null;
    this.onDataStateChanged.emit();
    // this.onDataStateChanged.error('Error Occured');
    // this.onDataStateChanged.complete();
  }
  addNewBook(newBook: Book): Observable<{ name: string }> {
    return this.httpClient
      .post<{ name: string }>('https://library-demo-e23d6.firebaseio.com/books.json', {
        ...newBook
      })
      .pipe(
        tap(() => {
          this.onDataStateChanged.emit();
        })
      );
  }
}
