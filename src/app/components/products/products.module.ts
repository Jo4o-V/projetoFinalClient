import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsStockComponent } from './products-stock/products-stock.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsCategoryComponent } from './products-category/products-category.component';
import { CategoryCreateComponent } from './products-category/category-create/category-create.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsStockComponent,
    ProductsCategoryComponent,
    CategoryCreateComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
