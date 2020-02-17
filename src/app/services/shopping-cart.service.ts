import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';

import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
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

  async get(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((data: any) => new ShoppingCart(data.items)));
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

  async clearCart() {
    const cartId = await this.getOrCreateId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId: string = await this.getOrCreateId();
    const items$ = this.getItem(cartId, product.key);

    items$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        const quantity = (item?.quantity || 0) + change;

        if (quantity <= 0) {
          items$.remove();
          return;
        }

        items$.update({ product, quantity });
      });
  }
}
