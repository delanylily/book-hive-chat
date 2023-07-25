import { Component, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'stream-chat-test';
  firestore: Firestore = inject(Firestore);
  constructor(public auth: AuthService, private router: Router) { }

  // signOut() {
  //   this.auth.signOut().subscribe({
  //     next: () => this.router.navigate(['signin'])
  //   });
  // }
}
