import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesRoutingModule } from './matches.routing.module';
import { MatchesComponent } from './matches.component';
import { FrameModule } from '../frame/frame.module';
import { RequestBookModule } from '../home/components/request-book-modal/request-book.module';
import { RouterModule } from '@angular/router';
import { BookCardModule } from '../shared/components/book-card/book-card.module';

@NgModule({
  imports: [
    CommonModule,
    MatchesRoutingModule,
    BookCardModule,
    FrameModule,
    RequestBookModule
  ],
  declarations: [MatchesComponent]
})
export class MatchesModule { }
