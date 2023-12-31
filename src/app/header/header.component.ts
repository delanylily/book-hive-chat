import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnDestroy {
  menuItemSelected: string;
  isDropdownOpen = false;
  signOutSubscription: Subscription;

  constructor(private readonly auth: AuthService, private router: Router, private toastr: ToastrService) { }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    this.signOutSubscription = this.auth.signOut().subscribe(() => {
      this.router.navigate(['/auth/signin']);
      this.toastr.success("Logout success");
    }, error => this.toastr.error(`Oops! Logout failed, reason: ${error}`));
  }

  ngOnDestroy(): void {
    if (this.signOutSubscription) {
      this.signOutSubscription.unsubscribe();
    }
  }
}
