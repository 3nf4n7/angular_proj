import { Food } from './Food';

export class CartItem {
  food: Food;
  price: number;
  quantity: number = 1;
  constructor(food: Food) {
    this.food = food;
    this.price = food.price;
  }
}
