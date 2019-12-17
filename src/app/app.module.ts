import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BookListComponent } from "./book-list/book-list.component";
import { BookDetailsComponent } from "./book-details/book-details.component";
import { BookFormComponent } from "./book-form/book-form.component";
import { CommonModule } from "@angular/common";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailsComponent,
    BookFormComponent,
    LoginComponent
  ],
  imports: [BrowserModule, CommonModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
