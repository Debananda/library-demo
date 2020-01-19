import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Book } from 'src/app/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  books: Book[];
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(books => {
      this.books = books;
    });
  }
}
