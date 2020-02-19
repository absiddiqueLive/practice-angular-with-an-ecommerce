import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Order } from 'src/app/models/order';
import { ShoppingCart } from 'src/app/models/shopping-cart';

import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping: any = {};
  cart: ShoppingCart;
  userId: string;
  cartSubscription: Subscription;
  authSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private route: Router
  ) {}

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placedOrder(order);
    this.route.navigate(['/order-success', result.key]);
  }

  async ngOnInit() {
    const cart$ = await this.cartService.get();
    this.cartSubscription = cart$.subscribe(cart => (this.cart = cart));
    this.authSubscription = this.auth.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }
}
