import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Book } from "../book.model";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"]
})
export class BookDetailsComponent implements OnInit {
  @Input() book: Book;
  @Output() onReset = new EventEmitter<void>();
  @Output() editBook = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
  reset() {
    this.onReset.emit();
  }
  onBookEdit() {
    this.editBook.emit();
  }
}
