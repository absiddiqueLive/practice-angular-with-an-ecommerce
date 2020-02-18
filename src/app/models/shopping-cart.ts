import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productKey: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (const productKey in itemsMap) {
      if (itemsMap.hasOwnProperty(productKey)) {
        const item = itemsMap[productKey];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }
  }

  getQuantity(product: Product): number {
    let item = null;

    if (!this.itemsMap) {
      return 0;
    }

    if (this.itemsMap.hasOwnProperty(product.key)) {
      item = this.itemsMap[product.key];
    }

    return item ? item.quantity : 0;
  }

  get totalItemCount() {
    let count = 0;

    for (const productKey in this.itemsMap) {
      if (this.itemsMap[productKey].quantity) {
        count += this.itemsMap[productKey].quantity;
      }
    }

    return count;
  }

  get totalPrice() {
    let sum = 0;

    for (const productKey in this.items) {
      if (this.items[productKey].totalPrice) {
        sum += this.items[productKey].totalPrice;
      }
    }

    return sum;
  }
}
