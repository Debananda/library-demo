import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  @Input() book: Book;
  @Output() onSave = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter<void>();
  saveClicked = false;
  constructor() {}

  ngOnInit() {}
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
    this.onSave.emit(modifiedBook);
  }
  cancelBookEdit() {
    this.onCancel.emit();
  }
}
