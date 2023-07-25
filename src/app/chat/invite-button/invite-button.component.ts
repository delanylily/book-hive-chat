import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, startWith, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';
import { Channel, UserResponse } from 'stream-chat';
import { ChatClientService, DefaultStreamChatGenerics } from 'stream-chat-angular';

@Component({
  selector: 'app-invite-button',
  templateUrl: './invite-button.component.html',
  styleUrls: ['./invite-button.component.scss']
})
export class InviteButtonComponent {
  @Input() channel!: Channel;

  showDialog = false;

  userSearchField = new FormControl();

  availableUsers$!: Observable<UserResponse<DefaultStreamChatGenerics>[]>;

  constructor(private chatClientService: ChatClientService) { }

  ngOnInit(): void {
    // this.userService.allUsers$.subscribe((res: any) => {
    //   console.log(res, 'allUsers');
    // });

    // this.availableUsers$.subscribe(user => {
    //   console.log(user, 'user');
    // });
    // this.availableUsers$
    // this.availableUsers$ = this.userSearchField.valueChanges.pipe(
    //   debounceTime(300),
    //   startWith(''),
    //   switchMap(queryString => this.chatClientService.autocompleteUsers(queryString))
    // );
  }

  addToChat() {
    this.channel.addMembers(['3hoU1vGWbNSMSnjwAg5LF5hwQaj2']);
  }
  // addToChat({ option: { value: userId } }: any) {
  //   this.channel.addMembers([userId]);
  // }

}

