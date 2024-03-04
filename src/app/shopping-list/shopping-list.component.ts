import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: Ingredient[];
  shoppingListService: ShoppingListService;
  ingredientChangedSubscription!: Subscription;
  ingredientDeletedSubscription!: Subscription;

  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangedSubscription =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );

    this.ingredientDeletedSubscription =
      this.shoppingListService.ingredientsDeleted.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  editIngredients(i: number) {
    this.ingredients
      ? this.shoppingListService.editIngredients(this.ingredients?.[i], i)
      : null;
  }

  ngOnDestroy(): void {
    this.ingredientChangedSubscription.unsubscribe();
    this.ingredientDeletedSubscription.unsubscribe();
  }
}
