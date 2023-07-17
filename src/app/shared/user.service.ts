import { Injectable } from '@angular/core';
import { Firestore, collection, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // get allUsers$(): Observable<User[]> {
  //   const ref = collection(this.firestore, 'users');
  //   const queryAll = query(ref);
  //   return collectionData(queryAll) as Observable<User[]>;
  // }
}
