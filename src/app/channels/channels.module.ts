import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewChannelComponent } from './new-channel/new-channel.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewChannelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NewChannelComponent,
  ]
})
export class ChannelsModule { }
