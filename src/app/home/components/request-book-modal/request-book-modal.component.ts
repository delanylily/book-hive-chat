import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Subscription, take } from 'rxjs';
import { Book } from '../../../models/book';
import { DataService } from '../../../shared/data.service';

@Component({
  selector: 'request-book-modal',
  templateUrl: './request-book-modal.component.html',
  styleUrls: ['./request-book-modal.component.less', '../../../../assets/styles/buttons.less']
})
export class RequestBookModalComponent implements OnDestroy {
  @Input() viewModel: any;
  @Output() onConfirmed: EventEmitter<null> = new EventEmitter<null>();
  isOpen: boolean = false;
  filterMatchesSubscription: Subscription;
  userBookSubscription: Subscription;
  availabilityText: string;
  requestedBook: Book;
  matchDetails: any;

  constructor(private readonly dataService: DataService, private router: Router) { }

  checkAvailability(): string {
    switch (this.viewModel?.book.availability) {
      case 'both':
        return this.availabilityText = 'borrow and swap';
      case 'lend':
        return this.availabilityText = 'borrow';
      case 'swap':
        return this.availabilityText = 'swap';
      default:
        return this.availabilityText = '';
    }
  }

  onConfirm() {
    this.requestedBook = this.viewModel.book;
    const reqBookOwnerId = this.viewModel.book.userId;
    this.dataService.addToRequested(this.viewModel.user, this.viewModel.book).subscribe(res => {
      // this.toastService.success({ detail: "Book requested succesfully", summary: res.message, duration: 3000 });
      alert({ detail: "Book requested succesfully", summary: res.message, duration: 3000 });

    });
    this.getUserRequests(reqBookOwnerId);
  }

  getUserRequests(reqBookOwnerId) {
    this.filterMatchesSubscription = combineLatest([this.dataService.getUserRequests(reqBookOwnerId), this.dataService.getUserMatches(this.viewModel.user)]).pipe(
      map(([requests, matches]) => {
        const matchBookIds = matches.map(match => match.userBook.id);
        if (requests.length) {
          const match = requests.filter((request: any) => request.userId === this.viewModel.user && !matchBookIds.includes(request.id));
          if (match.length) {
            this.addToMatches(match[0]);
          } else {
            this.isOpen = false;
          }
        }
      }), take(1)
    ).subscribe();
  }

  addToMatches(book) {
    this.matchDetails = { matchBook: this.requestedBook, userBook: book };
    this.dataService.addToMatches(this.viewModel.user, this.matchDetails).subscribe();
    this.dataService.addToMatches(this.requestedBook.userId, this.matchDetails).subscribe();
  }

  messageOwner() {
    this.router.navigate(['/inbox']);
  }

  viewCollection() {
    this.router.navigate(['/user', this.matchDetails.requestedBook.userId]);
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  ngOnDestroy(): void {
    if (this.userBookSubscription) {
      this.userBookSubscription.unsubscribe();
    }
    if (this.filterMatchesSubscription) {
      this.filterMatchesSubscription.unsubscribe();
    }
  }
}
