import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.less']
})
export class StepComponent implements OnInit {
  @Input() steps: any;

  constructor() { }

  ngOnInit() { }

  setCurrentActive() {
    if (this.steps.value.active && !this.steps.next?.value.active || this.steps.next === null && this.steps.value.active) {
      return true;
    } else {
      return false;
    }
  }
}
