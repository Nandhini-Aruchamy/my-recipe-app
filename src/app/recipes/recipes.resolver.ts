import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { RecipeService } from './recipe.service';
import { inject } from '@angular/core';
import { RecipeStore } from '../store/recipe.store';
import { patchState } from '@ngrx/signals';

export const RecipesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): void => {
  const recipeStore = inject(RecipeStore);
  if (!recipeStore.recipes()) {
    inject(RecipeService)
      .getRecipes()
      .subscribe((recipes) => {
        patchState(recipeStore, { recipes: recipes });
      });
  }
};
