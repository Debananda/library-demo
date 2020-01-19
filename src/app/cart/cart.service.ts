import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Book } from '../book.model';
import { Observable } from 'rxjs';

export interface Cart {
  email: string;
  book: Book;
}
@Injectable()
export class CartService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getCart(): Observable<Book[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.httpClient
          .get<Cart[]>('https://library-demo-e23d6.firebaseio.com/cart.json')
          .pipe(
            map(x => {
              return Object.keys(x || {}).map(key => {
                return { ...x[key], id: key };
              });
            }),
            map(x => x.filter(c => c.email === user.email).map(c => c.book))
          );
      })
    );
  }
}
