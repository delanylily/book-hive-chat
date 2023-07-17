import { Component } from '@angular/core';

@Component({
  selector: 'frame',
  styleUrls: ['./frame.component.less'],
  template: `
 <div class="wrapper">
  <header></header>
  <div class="content-wrapper">
<section class="content-header">
  <ng-content select="[title]"></ng-content>
</section>
<section class="content">
  <ng-content select="[body]"></ng-content>
</section>
  </div>
 </div>
  `
})
export class FrameComponent { }
