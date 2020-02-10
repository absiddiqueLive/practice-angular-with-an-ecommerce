import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: Product) {
    delete product.key;

    return this.db.list('/products').push(product);
  }

  update(product: Product) {
    const key = product.key;
    delete product.key;

    return this.db.object('/products/' + key).update(product);
  }

  delete(id: string) {
    this.db.object('/products/' + id).remove();
  }

  getAll(): Observable<Product[]> {
    return this.db
      .list('/products')
      .snapshotChanges()
      .pipe(
        map(products => {
          return products.map(product => {
            const key: string = product.key;
            const payload: any = product.payload.val();

            return { key, ...payload };
          });
        })
      );
  }

  getById(id: string) {
    return this.db.object('/products/' + id).snapshotChanges();
  }
}
