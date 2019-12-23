import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  selectedBookIndex = -1;
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.books = this.bookService.books;
    this.bookService.onDataStateChanged.subscribe(() => {
      this.books = this.bookService.books;
      this.selectedBookIndex = this.bookService.selectedBookIndex;
    });
  }

  bookSelected(index: number) {
    this.bookService.selectBook(index);
    // this.bookSelectionChanged.emit(index);
  }

  addNew() {
    this.bookService.addBook();
  }
}
