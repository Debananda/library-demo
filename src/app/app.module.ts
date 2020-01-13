import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartModule } from './cart/cart.module';
import { CartComponent } from './cart/cart/cart.component';
import { FileNotFoundComponent } from './file-not-found/file-not-found.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
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
    CartModule,
    BookModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
