import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'book-description-modal',
  templateUrl: 'book-description-modal.component.html',
  styleUrls: ['./book-description-modal.component.less']
})
export class BookDescriptionModalComponent implements OnInit {
  @Input() bookSummaryDetails: any;
  isOpen: boolean = false;
  constructor() { }

  ngOnInit() { }

  // onConfirm() {
  //   this.onConfirmed.emit();
  // }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }
}
