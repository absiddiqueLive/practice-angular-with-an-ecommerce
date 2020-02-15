import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductCategory } from 'src/app/models/product-category';

import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('filteredCategory') public filteredCategory: string;
  categories$: Observable<ProductCategory[]>;

  constructor(private categoryService: ProductCategoryService) {
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
  }
}
