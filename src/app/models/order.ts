import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];

  constructor(
    public userId: string,
    public shipping: any,
    private cart: ShoppingCart
  ) {
    {
      this.datePlaced = new Date().getTime();
      this.items = this.cart.items;
    }
  }
}
