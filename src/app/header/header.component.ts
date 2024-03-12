import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class headerComponent implements OnInit {
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isUserLoggedIn = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isUserLoggedIn = true;
      } else this.isUserLoggedIn = false;
    });
  }

  onLogout() {
    this.authService.signOut().subscribe(() => this.router.navigate(['/auth']));
  }
}
