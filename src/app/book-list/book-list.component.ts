import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Book } from "../book.model";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"]
})
export class BookListComponent implements OnInit {
  @Input() books: Book[];
  @Output() bookSelectionChanged = new EventEmitter<number>();
  selectedBookIndex = -1;
  constructor() {}

  ngOnInit() {}

  bookSelected(index: number) {
    this.selectedBookIndex = index;
    this.bookSelectionChanged.emit(index);
  }
}
