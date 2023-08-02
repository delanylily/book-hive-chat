import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { GenericModalComponent } from 'src/app/shared/components/generic-modal/generic-modal.component';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'user-collection',
  templateUrl: './user-collection.component.html',
  styleUrls: ['./user-collection.component.less']
})
export class UserCollectionComponent implements OnInit, OnDestroy {
  @Input() userId: string;
  @ViewChild('modal') modal: GenericModalComponent;
  modalContent: { heading: string, message: string; };
  books: Array<any>;
  itemToDelete: any;
  books$: Observable<any>;
  bookAvailability: string;
  bookAvailabilitySubscription: Subscription;

  constructor(private readonly dataService: DataService, private readonly toastService: ToastrService) { }

  ngOnInit() {
    this.modalContent = { heading: '', message: '' };
    this.books$ = this.dataService.getUserBooks(this.userId);
  }

  onDeleteBookConfirmation() {
    this.dataService.deleteUserBook(this.userId, this.itemToDelete.id).subscribe(() => {
      location.reload();
      this.toastService.success("Delete successful!");
    }), ((error) => {
      this.toastService.error(`${error}`);
    });
    this.modal.toggleModal();
  }

  selectBookAvailability(event): void {
    this.bookAvailabilitySubscription = this.dataService.updateBookAvailability(this.userId, event.bookId, event.bookAvailability).subscribe(() => {
      this.toastService.success("Book availability updated");
    }, error => this.toastService.error("Book availability update failed"));
  }

  onDeleteSelected(element): void {
    this.itemToDelete = element;
    this.modalContent.heading = "Confirm deletion";
    this.modalContent.message = `Are you sure you would like to delete "${element.title}" from your collection?`;
    this.modal.toggleModal();
  }

  ngOnDestroy(): void {
    if (this.bookAvailabilitySubscription) {
      this.bookAvailabilitySubscription.unsubscribe();
    }
  }
}
