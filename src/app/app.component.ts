import { Component } from "@angular/core";
import { Book } from "./book.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "library-demo";
  selectedBook: Book;
  books: Book[] = [
    {
      title: "Let us C",
      pages: 500,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/51Z4vZ9aqUL._SX258_BO1,204,203,200_.jpg",
      price: 300,
      author: "Yashwant Kanitkar",
      description: "C Fundamentals"
    },
    {
      title: "Let us C++",
      pages: 500,
      coverImage:
        "https://rukminim1.flixcart.com/image/416/416/jwmfcsw0/book/2/7/5/let-us-c-original-imafgpndjvdz9uvw.jpeg?q=70",
      price: 300,
      author: "Yashwant Kanitkar",
      description: "C++ Fundamentals"
    }
  ];

  onBookSelected(bookIndex: number) {
    this.selectedBook = this.books[bookIndex];
  }
  resetBookSelection() {
    this.selectedBook = null;
  }
}
