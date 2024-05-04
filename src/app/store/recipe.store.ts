import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Recipe } from '../recipes/recipe.model';
import { computed, inject } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

type RecipeState = {
  recipes: Recipe[] | undefined;
  index: number | undefined;
  updatedRecipe: Recipe | undefined;
  newRecipe: Recipe | undefined;
};

const initialState: RecipeState = {
  recipes: undefined,
  index: undefined,
  updatedRecipe: undefined,
  newRecipe: undefined,
};

export const RecipeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, recipeService = inject(RecipeService)) => ({
    fetchRecipes() {},
    addRecipe() {
      const recipe = store.newRecipe();
      if (recipe !== undefined) {
        recipeService.addRecipe(recipe);
      }
    },
    updateRecipe() {
      const i = store.index();
      const recipe = store.updatedRecipe();
      const recipesArray = store.recipes();

      if (i !== undefined && recipe !== undefined) {
        if (recipesArray && i >= 0 && i < recipesArray.length) {
          recipesArray[i] = recipe;
        }

        patchState(store, { recipes: store.recipes() });
      }
    },
    deleteRecipe() {
      const i = store.index();
      if (i !== undefined) {
        store.recipes()?.splice(i, 1);
        patchState(store, { recipes: store.recipes() });
      }
    },
    updateIndex(index: number | undefined) {
      patchState(store, { index: index });
    },
    clearRecipe() {
      patchState(store, { recipes: undefined });
    },
  })),

  withComputed((store) => ({
    detail: computed(() => {
      console.log(store);
      return store.recipes()?.find((_, index) => index === store.index());
    }),
  }))
);
