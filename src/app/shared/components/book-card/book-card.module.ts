import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './book-card.component';
import { RouterModule } from '@angular/router';
import { BookDescriptionModalComponent } from '../book-description-modal/book-description-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [BookCardComponent, BookDescriptionModalComponent],
  exports: [BookCardComponent]
})
export class BookCardModule { }
