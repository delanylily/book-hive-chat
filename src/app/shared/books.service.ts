import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BooksService {
  bookSelection: Subject<any> = new Subject<any>();

  constructor(private readonly http: HttpClient) { }

  getBooks(query: string) {
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  }
}

