import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  PLATFORM_INITIALIZER,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingComponent } from '../shared/loading/loading.component';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingComponent, AlertComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  authForm!: FormGroup;
  authService = inject(AuthService);
  authError: string | null = null;
  alertSubscription!: Subscription;

  @ViewChild('alertComponent', { read: ViewContainerRef })
  alertContainer!: ViewContainerRef;
  platformID = inject(PLATFORM_ID);

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('platformID', this.platformID);
    if (isPlatformBrowser(this.platformID)) localStorage.setItem('nan', '123');
  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    this.isLoading = true;
    let ObsAuth: Observable<void>;
    if (this.isLoginMode) {
      ObsAuth = this.authService.login(
        this.authForm.get('email')?.value,
        this.authForm.get('password')?.value
      );
    } else {
      ObsAuth = this.authService.register(
        this.authForm.get('email')?.value,
        this.authForm.get('password')?.value
      );
    }
    ObsAuth.subscribe({
      next: () =>
        this.router.navigate(['/recipes'], { relativeTo: this.route }),
      error: (error) => {
        console.log(error.code);
        this.loadAlertComponent(error.code);
        this.isLoading = false;
      },
    });
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  loadAlertComponent(errorMessage: string) {
    this.alertContainer.clear();
    const componentRef = this.alertContainer.createComponent(AlertComponent);
    componentRef.instance.message = errorMessage;
    this.alertSubscription = componentRef.instance.close.subscribe(() => {
      this.alertContainer.clear();
      this.alertSubscription.unsubscribe();
    });
  }
  ngOnDestroy(): void {
    this.alertContainer.clear();
  }
}
