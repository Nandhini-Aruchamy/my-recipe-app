import { Component, OnInit, inject } from '@angular/core';
import { Recipe } from '../recipe.model';
import { DropdownDirective } from '../../shared/directives/dropdown.directive';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective, RouterModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  recipeService: RecipeService;
  shoppingListService: ShoppingListService;
  index!: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.shoppingListService = inject(ShoppingListService);
    this.recipeService = inject(RecipeService);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.index = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.index);
    });
  }

  addToShoppingList() {
    this.shoppingListService.ingredients.push(...this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // onEdit() {
  //   this.router.navigate(['../1/Edit'] ,{ relativeTo : this.route});
  // }

}
