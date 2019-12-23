import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book.model';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book;
  saveClicked = false;
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.book = this.bookService.selectedBook;
    this.bookService.onDataStateChanged.subscribe(() => {
      this.book = this.bookService.selectedBook;
    });
  }
  saveBook(bookForm: NgForm) {
    this.saveClicked = true;
    if (bookForm.invalid) {
      return;
    }
    const modifiedBook = {
      ...this.book,
      title: bookForm.value['title'],
      price: bookForm.value['price'],
      author: bookForm.value['author']
    };
    this.bookService.saveBook(modifiedBook);
  }
  cancelBookEdit() {
    this.bookService.cancelBookEdit();
  }
}
