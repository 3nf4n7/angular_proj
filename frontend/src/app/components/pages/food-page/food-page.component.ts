import { Component } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-food-page',
  standalone: true,
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.css',
})
export class FoodPageComponent {
  food!: Food;

  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) this.food = foodService.getFoodById(params.id);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}
