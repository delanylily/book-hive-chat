import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription, catchError, from, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Channel } from 'stream-chat';
import { ChannelActionsContext, ChannelPreviewContext, ChannelService, ChatClientService, CustomTemplatesService, DefaultStreamChatGenerics, StreamI18nService } from 'stream-chat-angular';
import { ChatService } from '../shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  chatIsReady$!: Observable<boolean>;
  userId: string;
  isMenuOpen = true;
  chatInitializationSubscription: Subscription;
  userChatInitiated: { userId: string, name: string; };
  @ViewChild('channelPreview') private channelPreview!: TemplateRef<ChannelPreviewContext>;
  @ViewChild('channelActionsTemplate') private channelActionsTemplate: TemplateRef<ChannelActionsContext>;

  constructor(
    private chatService: ChatService,
    private auth: AuthService,
    private chatClientService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService
  ) { }

  ngOnInit(): void {
    this.userId = this.auth.getCurrentUser().uid;
    this.streamI18nService.setTranslation();
    this.chatIsReady$ = this.auth.getStreamToken().pipe(
      switchMap((streamToken) => this.chatClientService.init(
        environment.stream.key,
        this.auth.getCurrentUser().uid,
        streamToken
      )),
      switchMap(() => this.channelService.init({
        type: 'messaging',
        members: { $in: [this.auth.getCurrentUser().uid] },
      })),
      map(() => true),
      catchError(() => of(false))
    );
  }

  ngAfterViewInit(): void {
    this.customTemplatesService.channelPreviewTemplate$.next(
      this.channelPreview
    );
    this.customTemplatesService.channelActionsTemplate$.next(
      this.channelActionsTemplate
    );
    this.chatInitializationSubscription = this.chatService.userChatInitiated.subscribe(res => {
      if (res.userId.length) {
        this.userChatInitiated = {
          userId: res.userId,
          name: res.name
        };
        this.onCreate(this.userChatInitiated.name);
      }
    });
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatClientService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
        name,
        members: [this.auth.getCurrentUser().uid, this.userChatInitiated.userId]
      });

    from(channel.create());
    this.activateChannel(channel);
  }

  activateChannel(channel: Channel<DefaultStreamChatGenerics>) {
    this.channelService.setAsActiveChannel(channel);
  }

  ngOnDestroy(): void {
    if (this.chatInitializationSubscription) {
      this.chatInitializationSubscription.unsubscribe();
    }
  }
}
