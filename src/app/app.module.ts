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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'book',
    loadChildren: () => import('./book/book.module').then(mod => mod.BookModule)
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
    CartModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
