import { Component, OnInit, inject } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RouterModule } from '@angular/router';
import { RecipeStore } from '../../store/recipe.store';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent, RouterModule],
  providers: [],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  readonly recipeStore = inject(RecipeStore);

  ngOnInit() {}
}
