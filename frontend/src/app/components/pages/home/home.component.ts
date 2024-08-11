import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  foods: Food[] = [];

  constructor(private foodService: FoodService) {
    this.foods = foodService.getAll();
  }
}
