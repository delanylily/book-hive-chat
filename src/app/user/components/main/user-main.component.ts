import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, concatMap, filter, map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/shared/data.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.less', '../../../../assets/styles/buttons.less']
})
export class UserMainComponent implements OnInit, OnDestroy {
  user: any;
  user$: Observable<any>;
  userId: string;
  userSubscription: Subscription;
  finalUser: any;
  userForm = new FormGroup({
    uid: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    books: new FormControl(''),
    photoUrl: new FormControl('')
  });

  constructor(public readonly authService: AuthService, private readonly userService: UserService) { }

  ngOnInit() {
    this.user$ = this.authService.user$.pipe(
      filter(user => user !== null && user !== undefined),
      tap(user => {
        this.userId = user.uid;
      }),
      switchMap(() => this.userService.getUserDetails(this.userId))
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
