import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './components/add-book/add-book.component';
import { SearchBookComponent } from './components/search-book/search-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameModule } from '../frame/frame.module';
import { UserCollectionComponent } from './components/user-collection/user-collection.component';
import { UserMainComponent } from './components/main/user-main.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { BookCardModule } from '../shared/components/book-card/book-card.module';
import { GenericModalModule } from '../shared/components/generic-modal/generic-modal.module';
import { UserRoutingModule } from './user.routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    BookCardModule,
    FormsModule,
    FrameModule,
    GenericModalModule,
  ],
  declarations: [
    UserMainComponent,
    SearchBookComponent,
    UserDetailsComponent,
    AddBookComponent,
    UserCollectionComponent,
    EditProfileModalComponent
  ]
})
export class UserModule { }
