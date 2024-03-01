import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeListComponent } from '../recipe-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RecipeListComponent,RouterModule],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit{
  @Input() recipe!: Recipe;
  @Input() index! : number;

  constructor() {
  }

  ngOnInit(): void {
  }
}
