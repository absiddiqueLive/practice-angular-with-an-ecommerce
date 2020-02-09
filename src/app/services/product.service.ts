import { IProduct } from './../components/admin/product-form/product-form.component';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: IProduct) {
    delete product.key;

    return this.db.list('/products').push(product);
  }

  update(product: IProduct) {
    const key = product.key;
    delete product.key;

    return this.db.object('/products/' + key).update(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges();
  }

  getById(id: string) {
    return this.db.object('/products/' + id).snapshotChanges();
  }
}
