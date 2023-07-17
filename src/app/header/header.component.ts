import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnDestroy {
  menuItemSelected: string;
  isDropdownOpen = false;
  signOutSubscription: Subscription;

  constructor(private readonly auth: AuthService, private router: Router) { }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.signOutSubscription = this.auth.signOut().pipe(
      tap(() => {
        this.router.navigate(['/auth/register']);
        // this.toastService.success({ detail: "Logout success", duration: 3000 });
      })
    ).subscribe({
      // error: err => this.toastService.error({ detail: err.message, summary: "Logout failed", duration: 5000 })
    });
  }

  ngOnDestroy(): void {
    if (this.signOutSubscription) {
      this.signOutSubscription.unsubscribe();
    }
  }
}
