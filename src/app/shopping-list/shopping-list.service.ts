import { Injectable, signal } from '@angular/core';
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients = signal<Ingredient[]>([
    new Ingredient('Apples', 5),
    new Ingredient('tomatoes', 15),
  ]);

  ingredientsToBeEdited = signal<[Ingredient, number] | undefined>(undefined);

  constructor() {}

  getIngredients() {
    return this.ingredients;
  }

  addIngredients(ingredient: Ingredient) {
    this.ingredients.update((values) => [...values, ingredient]);
  }

  editIngredients(ingredient: Ingredient, index: number) {
    return this.ingredientsToBeEdited.set([ingredient, index]);
  }

  updateIngredients(ingredient: Ingredient, index: number) {
    this.ingredients.update((ingredients) => {
      ingredients[index] = ingredient;
      return ingredients;
    });
  }

  deleteIngredients(index: number) {
    this.ingredients.update((ingredients) => {
      ingredients.splice(index, 1);
      return ingredients;
    });
  }

  addFromRecipe(ingredients: Ingredient[]) {
    this.ingredients.update((values) => [...values, ...ingredients]);
  }
}
