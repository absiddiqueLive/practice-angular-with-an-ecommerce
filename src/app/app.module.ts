import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent as AdminOrdersComponent } from './components/admin/orders/orders.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { ProductsComponent as AdminProductsComponent } from './components/admin/products/products.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CartQuantityComponent } from './components/products/cart-quantity/cart-quantity.component';
import { FilterComponent as ProductFilterComponent } from './components/products/filter/filter.component';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingFormComponent } from './components/shopping-form/shopping-form.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { ProductCategoryService } from './services/product-category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductFilterComponent,
    CartQuantityComponent,
    ShoppingCartSummaryComponent,
    ShoppingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ProductCategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
