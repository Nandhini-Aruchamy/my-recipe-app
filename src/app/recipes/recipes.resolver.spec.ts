import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { RecipesResolver } from './recipes.resolver';
import { RecipeStore } from '../store/recipe.store';

let route: ActivatedRouteSnapshot;
let state: RouterStateSnapshot;
let recipeService: jasmine.SpyObj<RecipeService>;
let recipeStore: jasmine.SpyObj<any>;
const mockRecipes: Recipe[] = [
  new Recipe(
    'Pizza',
    'This is delicious pizza',
    'https://t3.ftcdn.net/jpg/01/33/61/72/240_F_133617244_dWdivRXwoLVzowl1kn3iFP9JGcuNd8n6.jpg',
    [
      new Ingredient('Base', 1),
      new Ingredient('cheese', 4),
      new Ingredient('chicken', 1),
    ]
  ),
  new Recipe(
    'Coffee',
    'Refreshing coffee',
    'https://t4.ftcdn.net/jpg/02/70/22/29/240_F_270222935_3JMTmu3yhOSV4vHCKnQYFqkznVycGhXA.jpg',
    [
      new Ingredient('Milk', 1),
      new Ingredient('Coffee powder', 1),
      new Ingredient('Sugar', 2),
    ]
  ),
];

describe('RecipesResolver', () => {
  const recipeServiceSpy = jasmine.createSpyObj(RecipeService, ['getRecipes']);
  const recipeStoreSpy = jasmine.createSpyObj(RecipeStore, ['recipes']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RecipeService,
          useValue: recipeServiceSpy,
        },
        {
          provide: RecipeStore,
          useValue: recipeStoreSpy,
        },
      ],
    });
    recipeService = TestBed.inject(
      RecipeService
    ) as jasmine.SpyObj<RecipeService>;
    recipeStore = TestBed.inject(RecipeStore);
  });

  it('should call the  getRecipes service method when recipe store is empty(undefined)', (done) => {
    recipeStoreSpy.recipes.and.returnValue(undefined);
    recipeServiceSpy.getRecipes.and.returnValue(of(mockRecipes));

    runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
      RecipesResolver(route, state)
    );
    expect(recipeService.getRecipes).toHaveBeenCalled();
    done();
  });

  it('should not call the  getRecipes service method when recipe store has value', (done) => {
    recipeStoreSpy.recipes.and.returnValue(mockRecipes);
    recipeServiceSpy.getRecipes.and.returnValue(of(mockRecipes));

    runInInjectionContext(TestBed.inject(EnvironmentInjector), () =>
      RecipesResolver(route, state)
    );
    expect(recipeService.getRecipes).not.toHaveBeenCalled();
    done();
  });
});
