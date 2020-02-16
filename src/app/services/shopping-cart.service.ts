import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators';

import { Product } from 'src/app/models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  create() {
    return this.db.list('/shopping-carts').push({
      createdAt: new Date().getTime()
    });
  }

  async get() {
    const cartId = await this.getOrCreateId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
    // .pipe(take(1))
  }

  private async getOrCreateId(): Promise<string> {
    const localCart: string = localStorage.getItem('cartId');

    if (localCart) {
      return localCart;
    }

    const result = await this.create();
    return result.key;
  }

  getItem(cartId: string, productKey: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId: string = await this.getOrCreateId();
    const items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        items$.update({ product, quantity: (item?.quantity || 0) + change });
      });
  }
}
