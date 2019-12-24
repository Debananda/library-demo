import { Component, OnInit } from '@angular/core';
import { Book } from '../../book.model';
import { BookService } from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  selectedBookIndex = -1;
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.books = this.bookService.books;
    this.bookService.onDataStateChanged.subscribe(() => {
      this.books = this.bookService.books;
      this.selectedBookIndex = this.bookService.selectedBookIndex;
    });
  }

  bookSelected(index: number) {
    // this.bookService.selectBook(index);
    // this.bookSelectionChanged.emit(index);
    this.router.navigate([index], { relativeTo: this.route });
    // this.router.navigate([`book/${index}`]);
  }

  addNew() {
    this.bookService.addBook();
  }
}
