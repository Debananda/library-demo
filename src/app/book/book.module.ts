import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { RouterModule } from '@angular/router';
import { BookGuard } from './book.guard';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './book.service';
import { CoreModule } from '../core/core.module';
import { BookResolver } from './book.resolver';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [BookListComponent, BookDetailsComponent, BookFormComponent, CatalogueComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'book',
        component: CatalogueComponent,
        canActivate: [AuthGuard],
        canActivateChild: [BookGuard],
        children: [
          { path: 'addBook', component: BookFormComponent },
          { path: ':id', component: BookDetailsComponent },
          {
            path: ':id/edit',
            component: BookFormComponent,
            canDeactivate: [BookGuard],
            resolve: { book: BookResolver }
          }
        ]
      }
    ])
  ],
  providers: [BookService, BookResolver]
})
export class BookModule {}
