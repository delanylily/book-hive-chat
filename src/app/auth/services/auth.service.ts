import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authState, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, updateProfile } from '@angular/fire/auth';
import { forkJoin, from, Observable, of, pluck, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private readonly auth: Auth, private http: HttpClient) { }

  getCurrentUser() {
    return this.auth.currentUser!;
  }

  getStreamToken() {
    return this.http.post<{ token: string; }>(`${environment.apiUrl}/createStreamToken`, {
      user: this.getCurrentUser()
    }).pipe(pluck('token'));
  }

  signIn({ email, password }: any) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp(registerForm: any): Observable<any> {
    const displayName = registerForm.displayName;
    return from(createUserWithEmailAndPassword(this.auth, registerForm.email, registerForm.password))
      .pipe(
        switchMap(({ user }) => forkJoin([
          updateProfile(user, { displayName }),
          this.http.post(
            `${environment.apiUrl}/createStreamUser`,
            { user: { ...user, displayName } })
        ])),
      );
  }

}