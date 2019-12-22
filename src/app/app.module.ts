import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { HeaderComponent } from './header/header.component';
import { BookService } from './book/book.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, CommonModule, FormsModule, AuthModule, BookModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
