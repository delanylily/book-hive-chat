import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { authState, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, updateProfile, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject, forkJoin, from, Observable, of, pluck, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  firestore: Firestore = inject(Firestore);
  private authState = new BehaviorSubject<Object | null>(null);
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  readonly isLoggedIn$ = authState(this.auth);

  constructor(private readonly auth: Auth, private readonly http: HttpClient) {

    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

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

  signOut() {
    const user = this.auth.currentUser;
    return from(this.auth.signOut()).pipe(
      switchMap(() => this.http.post(
        `${environment.apiUrl}/revokeStreamUserToken`,
        { user }
      ))
    );
  }

  signUp(registerForm: any): Observable<any> {
    const displayName = registerForm.displayName;
    return from(createUserWithEmailAndPassword(this.auth, registerForm.email, registerForm.password))
      .pipe(
        switchMap(({ user }) => {
          const uid = user.uid;
          const userDocRef = doc(this.firestore, 'users', uid);
          const updateUserDoc = setDoc(userDocRef, { ...registerForm, uid });
          const updateUserProfile = updateProfile(user, { displayName });
          return forkJoin([updateUserDoc, updateUserProfile]);
        })
      );
  }
}
