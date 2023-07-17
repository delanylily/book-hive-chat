import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { ChannelsModule } from '../channels/channels.module';
import { FrameModule } from '../frame/frame.module';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutingModule,
    ChannelsModule,
    StreamChatModule,
    FrameModule,
    StreamAutocompleteTextareaModule,
    TranslateModule.forChild(),
  ],
  declarations: [ChatComponent]
})
export class ChatModule { }
