import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Book } from 'src/app/models/book';
import { UserService } from 'src/app/shared/user.service';
import { BookDescriptionModalComponent } from 'src/app/shared/components/book-description-modal/book-description-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less', '../../../../assets/styles/buttons.less']
})
export class UserComponent implements OnInit {
  profileUserId: string;
  userId: string;
  user: User;
  data$: Observable<any>;
  bookSummaryDetails: any;
  userSubscription: Subscription;
  showRequest: boolean;
  requests: any;
  @ViewChild('modal') bookDescriptionModal: BookDescriptionModalComponent;

  constructor(private location: Location, private activatedRoute: ActivatedRoute, private readonly userService: UserService, private readonly dataService: DataService) { }

  ngOnInit() {
    this.profileUserId = this.activatedRoute.snapshot.params['userId'];
    const user$ = this.userService.getUserDetails(this.profileUserId);
    const books$ = this.dataService.getUserBooks(this.profileUserId);
    const doc$ = this.dataService.getBooksDocument(this.profileUserId);
    const requests$ = this.dataService.getUserRequests(this.userId);

    this.data$ = combineLatest([user$, books$, doc$, requests$]).pipe(
      map(([user, books, doc, requests]) => {
        this.requests = requests;
        return { user, books, doc, requests };
      })
    );
  }

  shouldShowRequest(bookId: string): boolean {
    const requestsIds = this.requests.map(request => request.id);
    return !requestsIds.includes(bookId);
  }

  goBack(): void {
    this.location.back();
  }

  onViewSummary(event): void {
    this.bookSummaryDetails = event;
    this.bookDescriptionModal.toggleModal();
  }

  onBookRequested(book: Book) {
    console.log(book);
  }

}
