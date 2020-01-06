import { Component, OnInit } from '@angular/core';
import { Book } from '../../book.model';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from '../book.guard';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, CanDeactivateComponent {
  book: Book;
  saveClicked = false;
  bookId = -1;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.bookId = +param['id'];
      this.book = this.bookService.getBook(this.bookId);
    });
    // this.book = this.bookService.selectedBook;
    this.bookService.onDataStateChanged.subscribe(() => {
      this.book = this.bookService.selectedBook;
    });
  }
  canDeactivate() {
    return window.confirm('Do you want to proceed?');
  }
  saveBook(bookForm: NgForm) {
    this.saveClicked = true;
    if (bookForm.invalid) {
      return;
    }
    const modifiedBook = {
      ...this.book,
      title: bookForm.value['title'],
      price: +bookForm.value['price'],
      author: bookForm.value['author'],
      pages: +bookForm.value['pages'],
      description: bookForm.value['description']
    };
    this.bookService.saveBook(this.bookId, modifiedBook);
    this.router.navigate(['/book', this.bookId]);
  }
  cancelBookEdit() {
    this.bookService.cancelBookEdit();
  }
}
