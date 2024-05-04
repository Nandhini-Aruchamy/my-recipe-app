import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditComponent } from './recipe-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { RecipeStore } from '../../store/recipe.store';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as ngrxSignals from '@ngrx/signals';
import { Ingredient } from '../../shared/models/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  //let routerSpy: jasmine.SpyObj<Router>; // Spy object for Router
  let routeSpy: jasmine.SpyObj<ActivatedRoute>; // Spy object for ActivatedRoute
  let paramsSubject: BehaviorSubject<any>;
  let recipeService: jasmine.SpyObj<RecipeService>;

  const formBuilder: FormBuilder = new FormBuilder();
  let recipeStoreSpy: jasmine.SpyObj<any>; // Spy object for RecipeStore

  beforeEach(async () => {
    paramsSubject = new BehaviorSubject({
      id: 3,
    });
    const recipeServiceSpy = jasmine.createSpyObj(RecipeService, [
      'getRecipes',
    ]);
    //const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RecipeEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: paramsSubject } },
        { provide: RecipeService, useValue: recipeServiceSpy },

        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;

    //routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>; // Inject the spy object for Router
    routeSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    recipeService = TestBed.inject(
      RecipeService
    ) as jasmine.SpyObj<RecipeService>;

    recipeStoreSpy = TestBed.inject(RecipeStore) as jasmine.SpyObj<any>; // Inject the spy object

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOninit on edit mode', (done) => {
    let spyUpdateIndex = spyOn(component.recipeStore, 'updateIndex');
    let spyLoadRecipe = spyOn(component, 'loadRecipe');

    component.ngOnInit();

    routeSpy.params.subscribe(() => {
      expect(spyUpdateIndex).toHaveBeenCalledWith(3);
      expect(component.isEditMode).toBeTrue();
      expect(spyLoadRecipe).toHaveBeenCalled();
      done();
    });
  });

  it('ngOninit on new recipe', (done) => {
    paramsSubject.next({ id: undefined });
    let spyUpdateIndex = spyOn(component.recipeStore, 'updateIndex');
    let spyLoadRecipe = spyOn(component, 'loadRecipe');

    component.ngOnInit();

    routeSpy.params.subscribe(() => {
      expect(component.test).toEqual(undefined);
      expect(spyUpdateIndex).toHaveBeenCalledWith(undefined);
      expect(component.isEditMode).toBeFalse();
      expect(spyLoadRecipe).toHaveBeenCalled();
      done();
    });
  });

  it('save Recipe on edit mode', () => {
    component.isEditMode = true;
    let storeUpdateRecipeSpy = spyOn(component.recipeStore, 'updateRecipe');
    let storeAddRecipeSpy = spyOn(component.recipeStore, 'addRecipe');
    let cancelEditSpy = spyOn(component, 'cancelEdit');

    component.saveRecipe();

    const expectedValue = {
      updatedRecipe: {
        name: 'Test Recipe',
        imagePath: 'test.jpg',
        description: 'Test Description',
        ingredients: [],
      },
    };
    // expect(patchState).toHaveBeenCalledWith(component.store, {
    //   updatedRecipe: undefined,
    // });

    expect(storeUpdateRecipeSpy).toHaveBeenCalled();
    expect(storeAddRecipeSpy).not.toHaveBeenCalled();
    expect(cancelEditSpy).toHaveBeenCalled();
  });

  it('cancel edit on edit mode', () => {
    let routerSpy = spyOn(component.router, 'navigate');
    component.cancelEdit();
    expect(routerSpy).toHaveBeenCalledWith(['../'], {
      relativeTo: routeSpy,
    });
  });

  it('loadRecipe() on adding new recipe', () => {
    component.isEditMode = false;
    // component.editRecipeForm = new FormGroup({
    //   name: new FormControl('as', Validators.required),
    //   imagePath: new FormControl(null, Validators.required),
    //   description: new FormControl(null, Validators.required),
    //   ingredients: new FormArray([]),
    // });
    const spyLoadIngredients = spyOn(component, 'loadIngredients');

    component.loadRecipe();

    // Access the form controls and test their values and validators
    const formGroup = component.editRecipeForm;
    expect(formGroup.get('name')?.value).toEqual(null);
    expect(formGroup.get('imagePath')?.value).toEqual(null);
    expect(formGroup.get('description')?.value).toEqual(null);

    expect(formGroup.get('name')?.validator?.(new FormControl())).toEqual({
      required: true,
    });
    expect(formGroup.get('imagePath')?.validator?.(new FormControl())).toEqual({
      required: true,
    });
    expect(
      formGroup.get('description')?.validator?.(new FormControl())
    ).toEqual({
      required: true,
    });

    expect(formGroup.get('ingredients')).toBeInstanceOf(FormArray);

    expect(spyLoadIngredients).not.toHaveBeenCalled();
  });
  it('loadRecipe() on edit mode', () => {
    component.isEditMode = true;
    spyOn(component.recipeStore, 'detail').and.returnValue({
      name: 'Pizza',
      description: 'This is delicious pizza',
      imagePath:
        'https://t3.ftcdn.net/jpg/01/33/61/72/240_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg',
      ingredients: [
        new Ingredient('Base', 1),
        new Ingredient('cheese', 4),
        new Ingredient('chicken', 1),
      ],
    });
    // component.editRecipeForm = new FormGroup({
    //   name: new FormControl('as', Validators.required),
    //   imagePath: new FormControl(null, Validators.required),
    //   description: new FormControl(null, Validators.required),
    //   ingredients: new FormArray([]),
    // });
    const spyLoadIngredients = spyOn(component, 'loadIngredients');

    component.loadRecipe();

    // Access the form controls and test their values and validators
    const formGroup = component.editRecipeForm;
    expect(formGroup.get('name')?.value).toEqual('Pizza');
    expect(formGroup.get('description')?.value).toEqual(
      'This is delicious pizza'
    );
    expect(formGroup.get('imagePath')?.value).toEqual(
      'https://t3.ftcdn.net/jpg/01/33/61/72/240_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg'
    );

    expect(formGroup.get('name')?.validator?.(new FormControl())).toEqual({
      required: true,
    });
    expect(formGroup.get('imagePath')?.validator?.(new FormControl())).toEqual({
      required: true,
    });
    expect(
      formGroup.get('description')?.validator?.(new FormControl())
    ).toEqual({
      required: true,
    });

    expect(formGroup.get('ingredients')).toBeInstanceOf(FormArray);

    expect(spyLoadIngredients).toHaveBeenCalled();
  });

  // it('service test sample', () => {
  //   recipeService.getRecipes.and.returnValue(
  //     of([
  //       new Recipe(
  //         'Pizza',
  //         'This is delicious pizza',
  //         'https://t3.ftcdn.net/jpg/01/33/61/72/240_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg',
  //         [
  //           new Ingredient('Base', 1),
  //           new Ingredient('cheese', 4),
  //           new Ingredient('chicken', 1),
  //         ]
  //       ),
  //       new Recipe(
  //         'Coffee',
  //         'Refreshing coffee',
  //         'https://t4.ftcdn.net/jpg/02/70/22/29/240_F_270222935_3JMTmu3yhOSV4vHCKnQYFqkznVycGhXA.jpg',
  //         [
  //           new Ingredient('Milk', 1),
  //           new Ingredient('Coffee powder', 1),
  //           new Ingredient('Sugar', 2),
  //         ]
  //       ),
  //     ])
  //   );

  //   component.testMethod();

  //   expect(component.test).toEqual('nan');
  // });

  // it('service test sample with empty result', () => {
  //   recipeService.getRecipes.and.returnValue(of([]));

  //   component.testMethod();

  //   expect(component.test).toEqual(undefined);
  // });
});
