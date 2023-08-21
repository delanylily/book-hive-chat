import { inject, Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore, getDoc, getDocs, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { updateProfile } from 'firebase/auth';
import { collection, getFirestore, query } from 'firebase/firestore';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../models/user';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  firestore: Firestore = inject(Firestore);
  constructor(private authenticationService: AuthService) {
  }

  updateUser(userId: string, userForm: any): Observable<any> {
    const ref = doc(this.firestore, 'users', userId);
    return from(updateDoc(ref, { displayName: userForm.displayName, photoURL: userForm.photoUrl, description: userForm?.description }));
  }

  getUserDetails(userId: string): Observable<any> {
    const docRef = doc(this.firestore, 'users', userId);
    return from(this.getSnapshot(docRef));
  }

  async getSnapshot(docRef) {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return console.log('no doc found');
    }
  }

  getDocumentSnapshot(query) {
    return from(getDocs(query)).pipe(
      map((querySnapshot) => {
        const elements: any[] = [];
        querySnapshot.forEach((doc) => {
          elements.push(doc.data());
        });
        return elements;
      })
    );
  }

  // get currentUserProfile$(): Observable<User | null> {
  //   return this.authenticationService.currentUser$.pipe(
  //     switchMap(user => {
  //       if (!user?.uid) {
  //         return of(null);
  //       }
  //       const ref = doc(this.firestore, 'users', user?.uid);
  //       return docData(ref) as Observable<User>;
  //     })
  //   );
  // }

  // getCurrentUser$(): Observable<User | null> {
  //   return this.authenticationService.currentUser$.pipe(
  //     switchMap(user => {
  //       if (!user?.uid) {
  //         return of(null);
  //       }
  //       const ref = doc(this.firestore, 'users', user?.uid);
  //       return docData(ref) as Observable<User>;
  //     })
  //   );
  // }

  get allUsers$(): Observable<User[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<User[]>;
  }

  // updateUser(userId: string, newDisplayName: string, newPhotoURL: string): Observable<any> {
  //   const ref = doc(this.firestore, 'users', userId);
  //   return from(updateDoc(ref, { displayName: newDisplayName, photoURL: newPhotoURL }));
  // }



  addUser(user: User): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  getProfileImage(userId: string) {
    const ref = doc(this.firestore, 'users', userId, 'profileImg');
  }
}
