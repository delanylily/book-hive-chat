import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { RequestBookModalComponent } from '../request-book-modal/request-book-modal.component';
import { DataService } from 'src/app/shared/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.less', '../../../../assets/styles/buttons.less']
})
export class StepCardComponent implements OnInit {
  @Input() step: any;
  @ViewChild('modal') modal: RequestBookModalComponent;
  userId: string;

  constructor(private readonly dataService: DataService, private readonly authService: AuthService, private readonly toastr: ToastrService) { }

  ngOnInit() {
    this.userId = this.authService.getCurrentUser().uid;
  }

  setCurrentActive() {
    if (this.step.value.active && !this.step.next?.value.active || this.step.next === null && this.step.value.active) {
      return true;
    } else {
      return false;
    }
  }

  saveBook(book) {
    this.dataService.addToSaved(this.userId, book).then(() => {
      this.toastr.success('Book saved to your favourites!');
      this.dataService.favouriteAdded();
    }, err => this.toastr.error(`An error occurred: ${err}`));
  }

  request() {
    this.modal.toggleModal();
  }

}
