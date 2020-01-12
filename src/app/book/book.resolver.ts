import { Injectable } from '@angular/core';
import { BookService } from './book.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../book.model';

@Injectable()
export class BookResolver implements Resolve<Book> {
  constructor(private bookService: BookService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
    return this.bookService.getBook(route.paramMap.get('id'));
  }
}
