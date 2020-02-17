import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {}

  get totalItemCount() {
    let count = 0;

    for (const productKey in this.items) {
      if (this.items[productKey].quantity) {
        count += this.items[productKey].quantity;
      }
    }

    return count;
  }
}
