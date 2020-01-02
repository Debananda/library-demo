import { Component, OnInit } from '@angular/core';
import { Book } from '../../book.model';
import { NgForm } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book;
  saveClicked = false;
  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      const bookId = +param['id'];
      this.book = this.bookService.getBook(bookId);
    });
    // this.book = this.bookService.selectedBook;
    this.bookService.onDataStateChanged.subscribe(() => {
      this.book = this.bookService.selectedBook;
    });
  }
  saveBook(bookForm: NgForm) {
    this.saveClicked = true;
    if (bookForm.invalid) {
      return;
    }
    const modifiedBook = {
      ...this.book,
      title: bookForm.value['title'],
      price: bookForm.value['price'],
      author: bookForm.value['author'],
      pages: bookForm.value['pages'],
      description: bookForm.value['description']
    };
    this.bookService.saveBook(modifiedBook);
  }
  cancelBookEdit() {
    this.bookService.cancelBookEdit();
  }
}
