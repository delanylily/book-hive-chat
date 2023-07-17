import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestBookModalComponent } from './request-book-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RequestBookModalComponent],
  exports: [RequestBookModalComponent]
})
export class RequestBookModule { }
