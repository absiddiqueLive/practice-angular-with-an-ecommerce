import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Order } from "src/app/models/order";

import { AuthService } from "src/app/services/auth.service";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-shopping-form",
  templateUrl: "./shopping-form.component.html",
  styleUrls: ["./shopping-form.component.css"]
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input("cart") cart;

  shipping: any = {};
  userId: string;
  authSubscription: Subscription;

  constructor(
    private route: Router,
    private auth: AuthService,
    private orderService: OrderService
  ) {}

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placedOrder(order);
    this.route.navigate(["/order-success", result.key]);
  }

  async ngOnInit(): Promise<void> {
    this.authSubscription = await this.auth.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
