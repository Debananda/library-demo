import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [BrowserModule, CommonModule, FormsModule, AuthModule, BookModule, CartModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
