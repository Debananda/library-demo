import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  @Output() onReset = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.book = this.bookService.selectedBook;
    this.bookService.onDataStateChanged.subscribe(() => {
      this.book = this.bookService.selectedBook;
    });
  }
  reset() {
    this.onReset.emit();
  }
  edit() {
    this.bookService.startBookEdit();
  }
  delete() {
    this.onDelete.emit();
  }
}
