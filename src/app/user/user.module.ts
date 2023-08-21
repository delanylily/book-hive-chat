import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/main-user/user.component';
import { UserRoutingModule } from './user.routing.module';
import { FrameModule } from '../frame/frame.module';
import { BookCardModule } from '../shared/components/book-card/book-card.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FrameModule,
    BookCardModule
  ],
  declarations: [
    UserComponent,
  ]
})
export class UserModule { }
