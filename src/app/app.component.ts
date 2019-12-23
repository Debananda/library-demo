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
}
