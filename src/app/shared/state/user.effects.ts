import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, } from "@ngrx/effects";
import { currentUser, currentUserLoaded } from "./user.actions";
import { AuthService } from "src/app/auth/services/auth.service";
import { Store } from "@ngrx/store";
import { filter, map, tap } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class UserEffects {

  constructor(private readonly store: Store<any>, private readonly actions$: Actions, private readonly authService: AuthService) { }

  currentUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(currentUser),
      tap(() => {
        this.authService.user$.pipe(
          filter(user => user !== null && user !== undefined)).subscribe(user => {
            const userFromFB: User = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            };
            this.store.dispatch(currentUserLoaded({ user: userFromFB }));
          });
      })
    ),
    { dispatch: false }
  );
}
