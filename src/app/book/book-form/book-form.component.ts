import { Component, OnInit } from '@angular/core';
import { Book } from '../../book.model';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from '../book.guard';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, CanDeactivateComponent {
  book: Book;
  saveClicked = false;
  bookId = '';
  loading = false;
  editBookSubscription: Observable<any>;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.bookId = param['id'];
      this.loading = true;
      this.bookService.getBook(this.bookId).subscribe(book => {
        this.book = book;
        this.loading = false;
      });
      if (Object.keys(this.book || {}).length === 0) {
        this.book = {
          title: '',
          price: null,
          author: '',
          pages: null,
          description: '',
          coverImage: ''
        };
      }
    });
    // this.book = this.bookService.selectedBook;
    this.bookService.onDataStateChanged.subscribe(() => {
      this.book = this.bookService.selectedBook;
    });
  }
  canDeactivate() {
    return true;
    // return window.confirm('Do you want to proceed?');
  }
  saveBook(bookForm: NgForm) {
    this.saveClicked = true;
    if (bookForm.invalid) {
      return;
    }
    const modifiedBook: Book = {
      ...this.book,
      title: bookForm.value['title'],
      price: +bookForm.value['price'],
      author: bookForm.value['author'],
      pages: +bookForm.value['pages'],
      description: bookForm.value['description'],
      coverImage: bookForm.value['coverImage']
    };
    this.loading = true;
    if (this.bookId) {
      this.editBookSubscription = this.bookService.saveBook(this.bookId, modifiedBook);
    } else {
      this.editBookSubscription = this.bookService.addNewBook(modifiedBook);
    }
    this.editBookSubscription.subscribe(() => {
      this.loading = false;
      this.router.navigate(['/book', this.bookId]);
    });
  }
  cancelBookEdit() {
    this.bookService.cancelBookEdit();
  }
}
