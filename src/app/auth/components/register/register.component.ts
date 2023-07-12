import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../styles/auth-styles.less', '../../../../assets/styles/buttons.less']
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  registerSubscription: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registerSubscription = this.auth.signUp(this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/chat']),
        error: (error) => alert({ detail: error.message, summary: "Registration failed", duration: 5000 })
      });
    }
  }


  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
