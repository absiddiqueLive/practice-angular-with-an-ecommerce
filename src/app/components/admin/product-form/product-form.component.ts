import { async } from '@angular/core/testing';
import { map, switchMap, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

export interface IProduct {
  key?: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: IProduct = {} as IProduct;
  categories$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: ProductCategoryService
  ) {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService
        .getById(productId)
        .pipe(take(1))
        .subscribe(p => {
          const key = p.key;
          const playload: any = p.payload.val();
          this.product = { key, ...playload };
        });
    }

    this.categories$ = this.categoryService.getCategories();
  }

  save(product: IProduct) {
    console.log(product);

    if (product.key) {
      this.productService.update(product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure, you want to delete ?')) {
      return;
    }

    this.productService.delete(this.product.key);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {}
}
