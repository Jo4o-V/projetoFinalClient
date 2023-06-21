import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductsStockComponent } from './products-stock/products-stock.component';
import { ProductsCategoryComponent } from './products-category/products-category.component';

const routes: Routes = [
  {
    path: 'register-new-product',
    component: ProductsComponent
  },
  {
    path: 'stock',
    component: ProductsStockComponent
  },
  {
    path: 'category',
    component: ProductsCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
