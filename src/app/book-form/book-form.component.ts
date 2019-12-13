import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Book } from "../book.model";

@Component({
  selector: "app-book-form",
  templateUrl: "./book-form.component.html",
  styleUrls: ["./book-form.component.css"]
})
export class BookFormComponent implements OnInit {
  @Input() book: Book;
  @Output() onBookSave = new EventEmitter<Book>();
  constructor() {}

  ngOnInit() {}
  saveBook() {
    this.onBookSave.emit(this.book);
  }
}
