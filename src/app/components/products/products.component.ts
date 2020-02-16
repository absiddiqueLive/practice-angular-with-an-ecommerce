import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  cart: any;
  products: Product[] = [];
  allProducts: Product[] = [];
  filteredCategory = '';
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.subscription = (await this.cartService.get()).subscribe(
      cart => (this.cart = cart)
    );

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
