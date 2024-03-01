import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
 public recipes: Recipe[] = [new Recipe("Pizza", "This is delicious pizza",
  "https://t3.ftcdn.net/jpg/01/33/61/72/240_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg",
  [new Ingredient("Base",1),new Ingredient("cheese",4),new Ingredient("chicken",1)]),
new Recipe("Coffee", "Refreshing coffee",
  "https://t4.ftcdn.net/jpg/02/70/22/29/240_F_270222935_3JMTmu3yhOSV4vHCKnQYFqkznVycGhXA.jpg",
  [new Ingredient("Milk",1),new Ingredient("Coffee powder",1),new Ingredient("Sugar",2)])];

  recipeUpdated = new Subject<Recipe[]>();
  recipeDeleted = new Subject<Recipe[]>();

  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id :number){
    return this.recipes[id];
  }

  addRecipe(recipe : Recipe){
    this.recipes.push(recipe);
    this.recipeUpdated.next(this.recipes);
  }

  updateRecipe(index:number, recipe : Recipe){
    this.recipes[index] = recipe;
    this.recipeUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeDeleted.next(this.recipes.slice());
  }
}
