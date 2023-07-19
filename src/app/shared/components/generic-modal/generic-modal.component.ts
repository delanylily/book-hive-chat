import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.less', '../../../../assets/styles/buttons.less']
})
export class GenericModalComponent implements OnInit {
  @Input() viewModel: { heading: string, message: string; bookcard: any; };
  @Output() onConfirmed: EventEmitter<null> = new EventEmitter<null>();
  @Output() onAvailabilitySelection: EventEmitter<{ availability: string; }> = new EventEmitter<{ availability: ''; }>();
  isOpen: boolean = false;
  constructor() { }

  ngOnInit() { }

  onConfirm() {
    this.onConfirmed.emit();
  }

  onAvailabilitySelected(availability) {
    this.onAvailabilitySelection.emit(availability.bookAvailability);
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
  }
}
