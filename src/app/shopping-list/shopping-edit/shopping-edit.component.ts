import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingListService: ShoppingListService;
  shoppingListForm!: FormGroup;
  isEditMode = false;
  editIndex: number | null = null;
  ingredientsEditedSubscription!: Subscription;

  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }

  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      itemAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });

    this.ingredientsEditedSubscription =
      this.shoppingListService.ingredientsToBeEdited.subscribe(
        ([ingredient, i]) => {
          this.shoppingListForm.setValue({
            itemName: ingredient.name,
            itemAmount: ingredient.amount,
          });
          this.editIndex = i;
          this.isEditMode = true;
        }
      );
  }

  submitItem() {
    if (this.isEditMode) {
      if (this.editIndex !== null) {
        this.shoppingListService.updateIngredients(
          new Ingredient(
            this.shoppingListForm.get('itemName')?.value,
            this.shoppingListForm.get('itemAmount')?.value
          ),
          this.editIndex
        );

        this.clearItem();
      }
    } else {
      this.shoppingListService.addIngredients(
        new Ingredient(
          this.shoppingListForm.get('itemName')?.value,
          this.shoppingListForm.get('itemAmount')?.value
        )
      );
    }
  }

  deleteItem() {
    if (this.editIndex !== null) {
      this.shoppingListService.deleteIngredients(this.editIndex);
      this.clearItem();
    }
  }

  clearItem() {
    this.isEditMode = false;
    this.editIndex = null;
    this.shoppingListForm.reset();
  }

  ngOnDestroy(): void {
    this.ingredientsEditedSubscription.unsubscribe();
  }
}
