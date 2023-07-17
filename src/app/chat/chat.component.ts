import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ChannelActionsContext, ChannelService, ChatClientService, CustomTemplatesService, StreamI18nService } from 'stream-chat-angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  chatIsReady$!: Observable<boolean>;
  @ViewChild('channelActionsTemplate') private channelActionsTemplate: TemplateRef<ChannelActionsContext>;
  constructor(
    private auth: AuthService,
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private customTemplatesService: CustomTemplatesService
  ) { }

  ngOnInit(): void {
    this.streamI18nService.setTranslation();
    this.chatIsReady$ = this.auth.getStreamToken().pipe(
      switchMap((streamToken) => this.chatService.init(
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
    this.customTemplatesService.channelActionsTemplate$.next(
      this.channelActionsTemplate
    );
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
        name,
        members: [this.auth.getCurrentUser().uid]
      });
    from(channel.create());
  }

}
