import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Book } from '../../book.model';
import { BookService } from '../book.service';
import { Subscription, Observer } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book: Book;
  changeSubscription: Subscription;
  @Output() onReset = new EventEmitter<void>();
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.book = this.bookService.selectedBook;
    this.changeSubscription = this.bookService.onDataStateChanged.subscribe(this.bookObserver);
  }
  bookObserver: Observer<void> = {
    next: () => {
      console.log('I am in Book Details next');
      this.book = this.bookService.selectedBook;
    },
    error: () => {
      console.log('Error Occured');
    },
    complete: () => {
      console.log('Complete');
    }
  };
  ngOnDestroy() {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
  }
  reset() {
    this.onReset.emit();
  }
  edit() {
    this.bookService.startBookEdit();
  }
  delete() {
    this.bookService.deleteBook();
  }
}
