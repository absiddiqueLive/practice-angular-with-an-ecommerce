import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placedOrder(order) {
    const result = await this.db.list('/orders').push(order);

    if (result.key) {
      this.cartService.clearCart();
    }

    return result;
  }
}
