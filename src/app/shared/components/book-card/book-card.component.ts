import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookDescriptionModalComponent } from '../book-description-modal/book-description-modal.component';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.less', '../../../../assets/styles/buttons.less']
})
export class BookCardComponent implements OnInit {
  @Input() bookVM: Book;
  @Input() cardSettings: { delete?: boolean, collection?: boolean, active?: boolean, summary?: any, request?: boolean; requestOptions?: { edit: boolean, display?: boolean; }; };
  @Output() bookDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() bookDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRequestBook: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRequestEdit: EventEmitter<{ bookAvailability: string, bookId: string; }> = new EventEmitter<{ bookAvailability: string, bookId: string; }>();
  @ViewChild('modal') bookDescriptionModal: BookDescriptionModalComponent;
  bookSummaryDetails: any;

  constructor() { }

  ngOnInit() {
  }

  viewDetails(book): void {
    this.bookSummaryDetails = book;
    this.bookDescriptionModal.toggleModal();
  }

  selectBookAvailability(event: string, bookId: string) {
    this.onRequestEdit.emit({ bookAvailability: event, bookId: bookId });
  }

  removeBook(bookId, userId): void {
    this.bookDelete.emit({ bookId, userId });
  }

  requestBook(): void {
    this.onRequestBook.emit(this.bookVM);
  }
}
