import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  allProducts: Product[] = [];
  filteredCategory = '';
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.subscription = this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.allProducts = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.products = this.allProducts;
        this.filteredCategory = params.get('category');

        if (this.filteredCategory) {
          this.products = this.allProducts.filter((product: Product) => {
            return product.category === this.filteredCategory;
          });
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
