import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  index!: number;
  recipe?: Recipe;
  isEditMode!: boolean;
  recipeService!: RecipeService;
  editRecipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.recipeService = inject(RecipeService);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.index = +params['id'];
      this.isEditMode = params['id'] != undefined;

      this.loadRecipe();
    });
  }

  addIngredient() {
    let formArray = <FormArray>this.editRecipeForm.get("ingredients");
    formArray.push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  saveRecipe() {
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.index, this.editRecipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.editRecipeForm.value);
    }
    this.cancelEdit();
  }

  cancelEdit() {
    //this.router.navigate(['/recipes/' + (this.isEditMode ?  this.index : '')])
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
      this.recipe = this.recipeService.getRecipe(this.index);
      recipeName = this.recipe.name;
      recipeImgPath = this.recipe.imagePath;
      description = this.recipe.description;
    }

    this.editRecipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImgPath, Validators.required),
      "description": new FormControl(description, Validators.required),
      "ingredients": new FormArray([])
    });
    if (this.isEditMode)
      this.loadIngredients();
  }

  loadIngredients() {
    if (this.recipe?.ingredients) {
      let formArray = <FormArray>this.editRecipeForm.get("ingredients");
      for (let index = 0; index < this.recipe.ingredients.length; index++) {
        const ingredient = this.recipe.ingredients[index];
        formArray.push(new FormGroup({
          "name": new FormControl(ingredient.name, Validators.required),
          "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      }
    }
  }

  getControls() {
    return (<FormArray>this.editRecipeForm?.get('ingredients')).controls;
  }
}
