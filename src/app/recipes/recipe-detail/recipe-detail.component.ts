import { Component, OnInit, inject, signal } from '@angular/core';
import { Recipe } from '../recipe.model';
import { DropdownDirective } from '../../shared/directives/dropdown.directive';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipeStore } from '../../store/recipe.store';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe | undefined;
  shoppingListService = inject(ShoppingListService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  recipeStore = inject(RecipeStore);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipeStore.updateIndex(+params['id']);
      this.recipe = this.recipeStore.detail();
    });
  }

  addToShoppingList() {
    if (this.recipe?.ingredients && this.recipe.ingredients.length > 0)
      this.shoppingListService.addFromRecipe(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeStore.deleteRecipe();
    //this.store.dispatch(RecipeActions.deleteRecipes({ index: this.index }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
