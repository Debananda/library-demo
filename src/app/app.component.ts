import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BookService } from './book/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'library-demo';
  selectedBook: Book;
  selectedBookIndex = -1;
  editMode: boolean = false;
  showlogin = false;
  books: Book[];

  constructor(private bookService: BookService) {}
  ngOnInit() {
    this.bookService.onDataStateChanged.subscribe(() => {
      this.editMode = this.bookService.editMode;
    });
  }
  resetBookSelection() {
    this.selectedBook = null;
  }
  deleteBook() {
    this.books = this.books.filter((book, idx) => idx !== this.selectedBookIndex);
    this.selectedBookIndex = -1;
    this.selectedBook = null;
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
  toggleLogin() {
    console.log('here');
    this.showlogin = !this.showlogin;
  }
}
