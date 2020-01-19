import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../book.model';
import { BookService } from '../book.service';
import { Subscription, Observer } from 'rxjs';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book: Book;
  changeSubscription: Subscription;
  editMode = true;
  bookId = '';
  loading = false;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.route.queryParams.subscribe(qp => {
    //   console.log(qp);
    //   this.editMode = qp.editMode === 'true';
    // });
    // this.book = this.bookService.getBook(+this.route.snapshot.params['id']);
    this.loading = true;
    this.route.params.subscribe(param => {
      this.bookId = param['id'];
      // this.bookService.selectBook(bookId);
      this.bookService
        .getBook(this.bookId)
        .pipe(
          tap(() => {
            this.loading = false;
          })
        )
        .subscribe(book => {
          this.book = book;
        });
    });
    // this.book = this.bookService.selectedBook;
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
  addToCart() {
    // this.router.navigate(["edit"], {preserveQueryParams:true})
    this.bookService.addToCart(this.book);
  }
  delete() {
    this.bookService.deleteBook(this.bookId).subscribe(() => {
      this.router.navigate(['/book']);
    });
  }
}
