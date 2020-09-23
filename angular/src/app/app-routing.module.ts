import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { KidsComponent } from './kids/kids.component';
import { LoginComponent } from './login/login.component';
import { MensComponent } from './mens/mens.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { WomensComponent } from './womens/womens.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mens', component: MensComponent },
  { path: 'womens', component: WomensComponent },
  { path: 'kids', component: KidsComponent },
  { path: 'order', component: OrderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
