import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CoreModule } from '../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CoreModule, HttpClientModule],
  providers: [CartService],
  exports: [CartComponent]
})
export class CartModule {}
