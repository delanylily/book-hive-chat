import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'stream-chat-test';

  constructor(public auth: AuthService, private router: Router) { }

  // signOut() {
  //   this.auth.signOut().subscribe({
  //     next: () => this.router.navigate(['signin'])
  //   });
  // }
}
