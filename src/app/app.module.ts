import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartModule } from './cart/cart.module';
import { AuthComponent } from './auth/auth/auth.component';
import { CatalogueComponent } from './book/catalogue/catalogue.component';
import { CartComponent } from './cart/cart/cart.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  // {
  //   path: 'book',
  //   component: CatalogueComponent,

  // },

  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'not-found',
    component: FileNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, FileNotFoundComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AuthModule,
    BookModule,
    CartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
