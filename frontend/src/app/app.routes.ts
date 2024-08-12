import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

export const routes: Routes = [
  { path: 'search/:search', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart-page', component: CartPageComponent },
];
