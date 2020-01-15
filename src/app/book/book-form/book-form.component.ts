import { Component, OnInit } from '@angular/core';
import { Book } from '../../book.model';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from '../book.guard';
import { Observable } from 'rxjs';

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
  editBookObservable: Observable<any>;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.book = data.book;
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
    // this.route.params.subscribe(param => {
    //   this.bookId = param['id'];
    //   this.loading = true;
    //   this.bookService.getBook(this.bookId).subscribe(book => {
    //     this.book = book;
    //     this.loading = false;
    //   });
    // if (Object.keys(this.book || {}).length === 0) {
    //   this.book = {
    //     title: '',
    //     price: null,
    //     author: '',
    //     pages: null,
    //     description: '',
    //     coverImage: ''
    //   };
    // }
    // });
    // // this.book = this.bookService.selectedBook;
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
    if (this.book.id) {
      const { id, ...book } = modifiedBook;
      this.editBookObservable = this.bookService.saveBook(id, book);
    } else {
      this.editBookObservable = this.bookService.addNewBook(modifiedBook);
    }
    this.editBookObservable.subscribe(book => {
      this.loading = false;
      this.router.navigate(['/book', book.id]);
    });
  }
  cancelBookEdit() {
    this.bookService.cancelBookEdit();
  }
}
