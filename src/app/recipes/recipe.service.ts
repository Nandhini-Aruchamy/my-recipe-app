import { Injectable, inject } from '@angular/core';
import { Recipe } from './recipe.model';
import { HttpRequestService } from '../shared/services/http-request.service';
import { RequestType } from '../shared/enums/request-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // private recipes = signal<Recipe[]>([]);
  httpService = inject(HttpRequestService);
  //   new Recipe(
  //     'Pizza',
  //     'This is delicious pizza',
  //     'https://t3.ftcdn.net/jpg/01/33/61/72/240_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg',
  //     [
  //       new Ingredient('Base', 1),
  //       new Ingredient('cheese', 4),
  //       new Ingredient('chicken', 1),
  //     ]
  //   ),
  //   new Recipe(
  //     'Coffee',
  //     'Refreshing coffee',
  //     'https://t4.ftcdn.net/jpg/02/70/22/29/240_F_270222935_3JMTmu3yhOSV4vHCKnQYFqkznVycGhXA.jpg',
  //     [
  //       new Ingredient('Milk', 1),
  //       new Ingredient('Coffee powder', 1),
  //       new Ingredient('Sugar', 2),
  //     ]
  //   ),
  // ];

  getRecipes(): Observable<Recipe[]> {
    return this.httpService.httpRequest(RequestType.GET) as Observable<
      Recipe[]
    >;
  }

  addRecipe(recipe: Recipe) {
    this.httpService.httpRequest(RequestType.UPDATE, recipe).subscribe();
  }

  // deleteRecipe(index: number) {
  //   this.recipes.update((recipes) => {
  //     recipes.splice(index, 1);
  //     return recipes;
  //   });
  // }
}
