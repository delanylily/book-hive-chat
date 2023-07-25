import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userChatInitiated: BehaviorSubject<{ userId: string, name: string; }> = new BehaviorSubject<{ userId: string, name: string; }>({ userId: '', name: '' });
  userChatInitiated$: Observable<{ userId: string, name: string; }> = this.userChatInitiated.asObservable();
  constructor() { }

}
