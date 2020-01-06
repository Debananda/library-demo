import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookFormComponent } from './book-form/book-form.component';
import { FormsModule } from '@angular/forms';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { RouterModule } from '@angular/router';
import { BookGuard } from './book.guard';

@NgModule({
  declarations: [BookListComponent, BookDetailsComponent, BookFormComponent, CatalogueComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CatalogueComponent,
        canActivate: [BookGuard],
        canActivateChild: [BookGuard],
        children: [
          { path: 'addBook', component: BookFormComponent },
          { path: ':id', component: BookDetailsComponent },
          { path: ':id/edit', component: BookFormComponent, canDeactivate: [BookGuard] }
        ]
      }
    ])
  ],
  exports: [BookListComponent, BookDetailsComponent, BookFormComponent, CatalogueComponent]
})
export class BookModule {}
