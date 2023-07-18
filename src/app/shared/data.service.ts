import { inject, Injectable } from '@angular/core';

import { from, map, Observable, Subject } from 'rxjs';
import { Book } from '../models/book';
import { addDoc, collection, collectionGroup, doc, Firestore, getDoc, getDocs, query, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  firestore: Firestore = inject(Firestore);
  onFavouriteAdded = new Subject<null>();
  onFavouriteAdded$ = this.onFavouriteAdded.asObservable();
  bookObj = {
    id: '',
    title: '',
    author: '',
    userId: '',
    description: '',
    image: '',
    availability: ''
  };
  constructor() { }

  favouriteAdded() {
    this.onFavouriteAdded.next(null);
  }

  addBookWithId(book: Book, userId: string) {
    this.bookObj.title = book.title;
    this.bookObj.userId = userId;
    this.bookObj.author = book.author;
    this.bookObj.description = book.description !== undefined ? book.description : '';
    this.bookObj.image = book.image;
    this.bookObj.availability = book.availability;
    let collectionRef = doc(this.firestore, `/users/${userId}/books`);
    return setDoc(collectionRef, this.bookObj);
  }

  addToSaved(userId: string, book: Book) {
    let collectionRef = collection(this.firestore, `/users/${userId}/favourites`);
    return addDoc(collectionRef, book);
  }

  addToMatches(userId: string, matchDetails: any): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/matches`);
    return from(addDoc(collectionRef, matchDetails));
  }

  getAllBooks(): Observable<any> {
    let collectionGroupRef = collectionGroup(this.firestore, `books`);
    const queryRef = query(collectionGroupRef);
    return this.getDocumentSnapshot(queryRef);
  }

  getUserFavourites(userId: string): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/favourites`);
    const queryRef = query(collectionRef);
    return this.getDocumentSnapshot(queryRef);
  }

  getUserMatches(userId: string): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/matches`);
    const queryRef = query(collectionRef);
    return this.getDocumentSnapshot(queryRef);
  }

  getUserRequests(userId: string): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/requests`);
    const queryRef = query(collectionRef);
    return this.getDocumentSnapshot(queryRef);
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

  addToRequested(userId: string, requestedBook: any): Observable<any> {
    let collectionRef = doc(this.firestore, `/users/${userId}/requests`);
    return from(setDoc(collectionRef, requestedBook));
  }

  // updateBookAvailability(userId: string, bookId: string, availability: string): Observable<any> {
  //   let collectionRef = this.firestore.collection('users').doc(userId).collection('books').doc(bookId);
  //   return from(collectionRef.update({ availability: availability }));
  // }

  // // getBooksDocument(userId) {
  // //   return this.firestore.collection(`/users/${userId}/books`).snapshotChanges();
  // // }

  // getUserBooks(userId: string) {
  //   return this.firestore.collection(`/users/${userId}/books`).valueChanges();
  // }




  // deleteUserBook(userId: string, bookId: string) {
  //   const itemRef = this.firestore.doc(`/users/${userId}/books/${bookId}`);
  //   return itemRef.delete();
  // }

  // // getFavouritesDocument(userId) {
  // //   return this.firestore.collection(`/users/${userId}/favourites`).snapshotChanges();
  // // }

  // removeFromFavourites(userId: string, bookId: string) {
  //   const collectionRef = this.firestore.collection(`/users/${userId}/favourites`);
  //   const query = collectionRef.ref.where('id', '==', bookId);
  //   query.get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       doc.ref.delete().then(() => {
  //         alert({ detail: "Book removed from favourites", duration: 3000 });

  //         // this.toastService.success({ detail: "Book removed from favourites", duration: 3000 });
  //         setTimeout(() => {
  //           location.reload();
  //         }, 3000);
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //     });
  //   });
  // }

  // getBooks() {
  //   return this.firestore.collection('Books').snapshotChanges();
  // }

  // deleteBook(book: Book) {
  //   return this.firestore.doc('/Books/' + book.id).delete();
  // }


  // addBookWithId(book: Book, userId: string) {
  //   this.bookObj.title = book.title;
  //   this.bookObj.userId = userId;
  //   this.bookObj.author = book.author;
  //   this.bookObj.description = book.description !== undefined ? book.description : '';
  //   this.bookObj.image = book.image;
  //   this.bookObj.availability = book.availability;
  //   let collectionRef = doc(this.db, `/users/${userId}/books`);
  //   return setDoc(collectionRef, this.bookObj);
  //   // let collectionRef = this.firestore.collection(`/users/${userId}/books`);
  //   // return collectionRef.add(this.bookObj).then((docRef) => {
  //   //   docRef.update({ id: docRef.id });
  //   // });
  // }

  // addToSaved(userId: string, book: Book) {
  //   let collectionRef = doc(this.db, `/users/${userId}/favourites`);
  //   return setDoc(collectionRef, book);
  //   // let collectionRef = this.firestore.collection(`/users/${userId}/favourites`);
  //   // return collectionRef.add(book).then((docRef) => {
  //   //   docRef.update({ id: book.id });
  //   // });
  // }

  // addToMatches(userId: string, matchDetails: any): Observable<any> {
  //   let collectionRef = doc(this.db, `/users/${userId}/matches`);
  //   return from(setDoc(collectionRef, matchDetails));
  //   // let collectionRef = this.firestore.collection(`/users/${userId}/matches`);
  //   // return from(collectionRef.add(matchDetails));
  // }

  // getUserMatches(userId: string): Observable<any> {
  //   let collectionRef = doc(this.db, `/users/${userId}/matches`);
  //   return from(getDoc(collectionRef));
  //   // return this.firestore.collection(`/users/${userId}/matches`).valueChanges();
  // }

  // getUserRequests(userId: string): Observable<any> {
  //   let collectionRef = doc(this.db, `/users/${userId}/requests`);
  //   return from(getDoc(collectionRef));
  //   // return this.firestore.collection(`/users/${userId}/requests`).valueChanges();
  // }

  // getAllBooks(): Observable<any> {
  //   let collectionRef = collectionGroup(this.db, `books`);
  //   return from(getDocs(collectionRef));
  // }



  // addToRequested(userId: string, requestedBook: any): Observable<any> {
  //   let collectionRef = doc(this.db, `/users/${userId}/requests`);
  //   return from(setDoc(collectionRef, requestedBook));
  // }



  // getUserBook(userId: string, bookId: string): Observable<any> {
  //   return this.firestore.collection(`/users/${userId}/books`).doc(bookId).valueChanges();
  // }





  // updateBookAvailability(userId: string, bookId: string, availability: string): Observable<any> {
  //   let collectionRef = this.firestore.collection('users').doc(userId).collection('books').doc(bookId);
  //   return from(collectionRef.update({ availability: availability }));
  // }

  // // getBooksDocument(userId) {
  // //   return this.firestore.collection(`/users/${userId}/books`).snapshotChanges();
  // // }

  // getUserBooks(userId: string) {
  //   return this.firestore.collection(`/users/${userId}/books`).valueChanges();
  // }




  // deleteUserBook(userId: string, bookId: string) {
  //   const itemRef = this.firestore.doc(`/users/${userId}/books/${bookId}`);
  //   return itemRef.delete();
  // }

  // // getFavouritesDocument(userId) {
  // //   return this.firestore.collection(`/users/${userId}/favourites`).snapshotChanges();
  // // }

  // removeFromFavourites(userId: string, bookId: string) {
  //   const collectionRef = this.firestore.collection(`/users/${userId}/favourites`);
  //   const query = collectionRef.ref.where('id', '==', bookId);
  //   query.get().then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       doc.ref.delete().then(() => {
  //         alert({ detail: "Book removed from favourites", duration: 3000 });

  //         // this.toastService.success({ detail: "Book removed from favourites", duration: 3000 });
  //         setTimeout(() => {
  //           location.reload();
  //         }, 3000);
  //       }).catch((error) => {
  //         console.log(error);
  //       });
  //     });
  //   });
  // }

  // getBooks() {
  //   return this.firestore.collection('Books').snapshotChanges();
  // }

  // deleteBook(book: Book) {
  //   return this.firestore.doc('/Books/' + book.id).delete();
  // }
}



