import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../../styles/auth-styles.less', '../../../../assets/styles/buttons.less']
})
export class SigninComponent implements OnInit {
  loginSubscription: Subscription;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.auth.signIn(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['chat']),
      error: (error) => alert(error.message)
    });
  }

}
