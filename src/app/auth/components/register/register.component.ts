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

  constructor(private readonly auth: AuthService, private readonly router: Router) {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.registerSubscription = this.auth.signUp(this.registerForm.value).subscribe(() => {
        this.router.navigate(['/home']);
      }, error => alert(error.message));
    }
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
