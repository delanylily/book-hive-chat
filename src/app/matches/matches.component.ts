import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Book } from '../models/book';
import { DataService } from '../shared/data.service';
import { RequestBookModalComponent } from '../home/components/request-book-modal/request-book-modal.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.less', '../../assets/styles/buttons.less']
})
export class MatchesComponent implements OnInit, OnDestroy {
  bookList: Book[] = [];
  data: any;
  favouritesSubscription: Subscription;
  userId: string;
  user$: any;
  user: any;
  bookDetailsSubscription: Subscription;
  userMatchesSubscription: Subscription;
  matches: Array<any>;
  requestedDetails: { book: Book, user: string; };
  @ViewChild('requestModal') requestModal: RequestBookModalComponent;

  constructor(private readonly router: Router, private readonly authService: AuthService, private readonly dataService: DataService) { }

  ngOnInit() {
    this.authService.user$.pipe(
      filter(user => user !== null && user !== undefined),
      map(user => {
        this.userId = user.uid;
        this.getUserFavourites();
        this.getUserMatches();
      })
    ).subscribe();
  }

  getUserMatches() {
    this.userMatchesSubscription = this.dataService.getUserMatches(this.userId).subscribe(matches => {
      this.matches = matches;
    });
  }

  onRequestBook(book): void {
    this.requestedDetails = { book: book, user: this.userId };
    this.requestModal.toggleModal();
  }

  onBookDelete(book) {
    this.dataService.removeFromFavourites(this.userId, book.bookId);
  }

  getUserFavourites() {
    console.log(this.userId, 'userID');
    this.favouritesSubscription = this.dataService.getUserFavourites(this.userId).pipe(
      map(fav => {
        fav.map(book => {
          this.bookList.push(book);
        });
      }),
    ).subscribe();
  }

  navigateToUserProfile(bookOwnerId): void {
    this.router.navigate(['user', bookOwnerId]);
  }

  ngOnDestroy(): void {
    if (this.favouritesSubscription) {
      this.favouritesSubscription.unsubscribe();
    }
    if (this.bookDetailsSubscription) {
      this.bookDetailsSubscription.unsubscribe();
    }
    if (this.userMatchesSubscription) {
      this.userMatchesSubscription.unsubscribe();
    }
  }
}
