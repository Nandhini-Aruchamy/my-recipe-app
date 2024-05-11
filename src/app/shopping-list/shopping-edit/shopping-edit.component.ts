import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit {
  shoppingListService = inject(ShoppingListService);
  shoppingListForm!: FormGroup;
  isEditMode = false;
  editIndex: number | null = null;
  ingredientsToBeEdited = signal<[Ingredient, number] | undefined>(undefined);

  constructor() {
    effect(() => {
      this.ingredientsToBeEdited =
        this.shoppingListService.ingredientsToBeEdited;
      let editValue = this.ingredientsToBeEdited();
      if (editValue !== undefined) {
        this.shoppingListForm.setValue({
          itemName: editValue[0].name,
          itemAmount: editValue[0].amount,
        });
        this.editIndex = editValue[1];
        this.isEditMode = true;
      }
    });
  }

  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      itemName: new FormControl(null, Validators.required),
      itemAmount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
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
}
