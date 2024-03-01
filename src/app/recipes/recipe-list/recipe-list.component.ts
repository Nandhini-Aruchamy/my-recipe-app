import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent, RouterModule],
  providers: [],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipeService: RecipeService;
  recipeUpdatedSubscription!: Subscription;
  recipeDeletedSubscription! : Subscription;

  recipes?: Recipe[];

  constructor() {
    this.recipeService = inject(RecipeService);
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipeUpdated.subscribe((recipes) => this.recipes = recipes);
    this.recipeService.recipeDeleted.subscribe((recipes) => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.recipeUpdatedSubscription.unsubscribe();
    this.recipeDeletedSubscription.unsubscribe();
  }
} 