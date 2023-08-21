import { inject, Injectable } from '@angular/core';

import { from, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Book } from '../models/book';
import { addDoc, collection, collectionGroup, deleteDoc, doc, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private toastr: ToastrService) { }

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
    let collectionRef = collection(this.firestore, `/users/${userId}/books`);
    return addDoc(collectionRef, this.bookObj)
      .then((docRef) => {
        let docReference = doc(this.firestore, `/users/${userId}/books/${docRef.id}`);
        return from(updateDoc(docReference, { id: docRef.id }));
      });
  }


  // userData(userId: string) {
  //   let collectionRef = collection(this.firestore, `/users/${userId}`);
  //   const queryRef = query(collectionRef);
  //   return this.getDocumentSnapshot(queryRef);
  // }

  addToSaved(userId: string, book: Book): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/favourites`);
    return from(addDoc(collectionRef, book));
  }

  addToMatches(userId: string, matchDetails: any): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/matches`);
    return from(addDoc(collectionRef, matchDetails));
  }



  getUserFavourites(userId: string): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/favourites`);
    const queryRef = query(collectionRef);
    return this.getDocumentSnapshot(queryRef);
  }

  // getUserBook(userId: string, bookId: string): Observable<any> {
  //   return this.firestore.collection(`/users/${userId}/books`).doc(bookId).valueChanges();
  // }

  getUserBooks(userId: string): Observable<any> {
    let collectionRef = collection(this.firestore, `/users/${userId}/books`);
    const queryRef = query(collectionRef);
    return from(this.getDocumentSnapshot(queryRef));
  }

  getBooksDocument(userId: string) {
    let collectionRef = collection(this.firestore, `/users/${userId}/books`);
    const queryRef = query(collectionRef);
    return from(this.getDocumentSnapshot(queryRef));
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

  updateBookAvailability(userId: string, bookId: string, availability: string): Observable<any> {
    let docRef = doc(this.firestore, `/users/${userId}/books/${bookId}`);
    return from(updateDoc(docRef, { availability: availability }));
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
    let collectionRef = collection(this.firestore, `/users/${userId}/requests`);
    return from(addDoc(collectionRef, requestedBook));
  }

  deleteUserBook(userId: string, bookId: string) {
    // this.removeFromMatches(userId, bookId);
    this.removeFromAllMatches(bookId);

    let itemRef = doc(this.firestore, `/users/${userId}/books/${bookId}`);
    return from(deleteDoc(itemRef));
  }

  getAllBooks(): Observable<any> {
    let collectionGroupRef = collectionGroup(this.firestore, `books`);
    const queryRef = query(collectionGroupRef);
    return this.getDocumentSnapshot(queryRef);
  }

  removeFromAllMatches(bookId: string) {
    let collectionGroupRef = collectionGroup(this.firestore, `matches`);
    const queryRef = query(collectionGroupRef);



    return this.getDocumentSnapshot(queryRef).subscribe(matches => {
      matches.filter((element) => {
        return element.matchBook.id !== bookId && element.userBook.id !== bookId;
      });
      console.log(matches, 'matcheees');
    });
  }

  // removeFromMatches(userId: string, bookId: string): any {
  //   const collectionRef = collection(this.firestore, `/users/${userId}/matches`);
  //   const q = query(collectionRef, where('userBook.id', '==', bookId));

  //   return from(getDocs(q)).subscribe((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       const docRef = doc.ref;
  //       from(deleteDoc(docRef)).subscribe(
  //         () => {
  //           this.toastr.success("Book removed from matches");
  //           setTimeout(() => {
  //             location.reload();
  //           }, 3000);
  //         },
  //         (error) => {
  //           this.toastr.error(`Book removed from matches${error}`);
  //         }
  //       );
  //     });
  //   });
  // }

  removeFromFavourites(userId: string, bookId: string): any {
    const collectionRef = collection(this.firestore, `/users/${userId}/favourites`);
    const q = query(collectionRef, where('id', '==', bookId));

    return from(getDocs(q)).subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const docRef = doc.ref;
        from(deleteDoc(docRef)).subscribe(
          () => {
            this.toastr.success("Book removed from favourites");
            setTimeout(() => {
              location.reload();
            }, 3000);
          },
          (error) => {
            this.toastr.error(`Book removed from favourites${error}`);
          }
        );
      });
    });
  }
}













  // // getFavouritesDocument(userId) {
  // //   return this.firestore.collection(`/users/${userId}/favourites`).snapshotChanges();
  // // }



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




