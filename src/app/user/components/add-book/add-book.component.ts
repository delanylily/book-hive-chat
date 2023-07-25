import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.less']
})
export class AddBookComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  // goBack(): void {
  //   this.router.navigateByUrl(document.referrer);
  // }
}
