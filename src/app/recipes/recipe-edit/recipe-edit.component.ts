import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RecipeStore } from '../../store/recipe.store';
import { patchState } from '@ngrx/signals';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe | undefined = undefined;
  isEditMode = false; //new recipe
  editRecipeForm!: FormGroup;
  route = inject(ActivatedRoute);
  router = inject(Router);
  recipeStore = inject(RecipeStore);
  test!: string | undefined;
  recipeService = inject(RecipeService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'] == undefined ? undefined : +params['id'];
      this.recipeStore.updateIndex(id);
      this.isEditMode = id != undefined;
      this.loadRecipe();
    });
  }

  // testMethod() {
  //   this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
  //     if (recipes.length > 0) this.test = 'nan';
  //     else this.test = undefined;
  //   });
  // }

  addIngredient() {
    const formArray = <FormArray>this.editRecipeForm.get('ingredients');
    formArray.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  saveRecipe() {
    if (this.isEditMode) {
      //edit recipe
      patchState(this.recipeStore, {
        updatedRecipe: this.editRecipeForm.value,
      });
      this.recipeStore.updateRecipe();
    } else {
      //add new recipe
      patchState(this.recipeStore, { newRecipe: this.editRecipeForm.value });
      this.recipeStore.addRecipe();
    }
    this.cancelEdit();
  }

  cancelEdit() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editRecipeForm.get('ingredients')).removeAt(index);
  }

  loadRecipe() {
    let recipeName = null;
    let recipeImgPath = null;
    let description = null;

    if (this.isEditMode) {
      this.recipe = this.recipeStore.detail();
      if (this.recipe !== undefined) {
        recipeName = this.recipe.name;
        recipeImgPath = this.recipe.imagePath;
        description = this.recipe.description;
      }
    }

    this.editRecipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: new FormArray([], this.emptyArrayValidator()),
    });
    if (this.isEditMode) this.loadIngredients();
  }

  emptyArrayValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value.length === 0
        ? { atLeastOneValueRequired: true }
        : null;
    };
  }

  emptyArrayValidator1() {
    return (formArray: FormArray) => {
      if (formArray.length === 0) {
        return { atLeastOneValueRequired: true };
      } else {
        return null;
      }
    };
  }

  loadIngredients() {
    if (this.recipe?.ingredients) {
      const formArray = <FormArray>this.editRecipeForm.get('ingredients');
      for (let index = 0; index < this.recipe.ingredients.length; index++) {
        const ingredient = this.recipe.ingredients[index];
        formArray.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          })
        );
      }
    }
  }

  getControls() {
    return (<FormArray>this.editRecipeForm?.get('ingredients')).controls;
  }
}
