import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from '../product-form/product-form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      // .pipe(
      //   map(products => {
      //     this.products = products.map(product => {
      //       const key = product.key;
      //       const payload: any = product.payload.val();
      //       product = { key, ...payload };
      //     });
      //   })
      // )
      .subscribe(
        products => (this.filteredProducts = this.products = products)
      );
  }

  search(query: string) {
    this.filteredProducts = query
      ? this.products.filter((product: IProduct) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
