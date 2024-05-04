import { Component, OnInit, inject, signal } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients = signal<Ingredient[]>([]);
  shoppingListService = inject(ShoppingListService);

  constructor() {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  editIngredients(i: number) {
    this.shoppingListService.editIngredients(this.ingredients()[i], i);
  }
}
