import { Component, OnInit, inject, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RecipeStore } from '../store/recipe.store';
import { AuthStore } from '../store/auth.store';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class headerComponent {
  authService = inject(AuthService);
  router = inject(Router);
  recipeStore = inject(RecipeStore);
  authStore = inject(AuthStore);
  isUserLoggedIn = false;

  constructor() {
    effect(() => {
      //const state = getState(this.authStore); getState to get current state value of signal store
      if (this.authStore.userData() !== undefined) {
        this.isUserLoggedIn = true;
      } else this.isUserLoggedIn = false;
    });
  }

  onLogout() {
    this.isUserLoggedIn = false;
    this.authStore.clearUserDate();
    this.recipeStore.clearRecipe();
    this.authService.signOut().subscribe(() => this.router.navigate(['/auth']));
  }
}
