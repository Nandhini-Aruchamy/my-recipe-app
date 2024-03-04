import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsToBeEdited = new Subject<[Ingredient, number]>();
  ingredientsDeleted = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('tomatoes', 15),
  ];

  constructor() {}

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredients(ingredient: Ingredient, index: number) {
    this.ingredientsToBeEdited.next([ingredient, index]);
  }

  updateIngredients(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
  }

  deleteIngredients(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsDeleted.next(this.ingredients.slice());
  }
}
