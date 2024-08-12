import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  getAll(): Food[] {
    return sample_foods;
  }

  getSearch(search: string) {
    return this.getAll().filter((food) =>
      food.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  getAllTags(): Tag[] {
    return sample_tags;
  }

  getSearchByTag(tag: string): Food[] {
    return tag === 'All'
      ? this.getAll()
      : this.getAll().filter((food) => food.tags?.includes(tag));
  }
}
