import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from './recipe.service';
import { inject } from '@angular/core';

export const RecipesResolver: ResolveFn<any> = (): Observable<any> => {
  const recipeService = inject(RecipeService);

  return recipeService.getRecipes();
};
