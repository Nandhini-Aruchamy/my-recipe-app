import { Injectable, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { Observable, Subject, map, of } from 'rxjs';
import { HttpRequestService } from '../shared/services/http-request.service';
import { RequestType } from '../shared/enums/request-type';
import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  public recipes: Recipe[] = [
    new Recipe(
      'Pizza',
      'This is delicious pizza',
      'https://t3.ftcdn.net/jpg/01/33/61/72/240_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg',
      [
        new Ingredient('Base', 1),
        new Ingredient('cheese', 4),
        new Ingredient('chicken', 1),
      ]
    ),
    new Recipe(
      'Coffee',
      'Refreshing coffee',
      'https://t4.ftcdn.net/jpg/02/70/22/29/240_F_270222935_3JMTmu3yhOSV4vHCKnQYFqkznVycGhXA.jpg',
      [
        new Ingredient('Milk', 1),
        new Ingredient('Coffee powder', 1),
        new Ingredient('Sugar', 2),
      ]
    ),
  ];

  recipeFetched = new Subject<Recipe[]>();
  recipeUpdated = new Subject<Recipe[]>();
  recipeDeleted = new Subject<Recipe[]>();
  httpService = inject(HttpRequestService);

  getRecipes(): Observable<Recipe[]> {
    return of(this.recipes);
    // return this.httpService
    //   .httpRequest(RequestType.GET)
    //   .pipe(map((recipes) => (this.recipes = recipes as Recipe[])));
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    // this.httpService.httpRequest(RequestType.UPDATE, recipe);
    //.subscribe((data) => console.log(data));
    //this.recipeUpdated.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    // this.httpService
    //   .httpRequest('post', recipe)
    //   .subscribe((data) => console.log(data));
    // this.recipeUpdated.next(this.recipes);
    this.recipes[index] = recipe;
    // this.recipeUpdated.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    //this.recipeDeleted.next(this.recipes.slice());
  }
}
