import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { DoubleLinkedList } from 'src/app/models/linked-list';
@Component({
  selector: 'stepper-container',
  templateUrl: './stepper-container.component.html',
  styleUrls: ['./stepper-container.component.less']
})
export class StepperComponent implements OnInit, OnDestroy {
  @Input() data: any;
  linkedList: DoubleLinkedList = new DoubleLinkedList();
  steps: any;
  activeStep: number = 1;
  activeStepSubscription: Subscription;
  activeStep$: Subject<number> = new Subject();

  constructor() { }

  ngOnInit() {
    this.data.map((item, index) => {
      this.linkedList.push({ active: this.activeStep >= index + 1, data: item });
    });
    this.steps = this.linkedList.toArray();
    this.activeStepSubscription = this.activeStep$.subscribe(step => {
      this.steps.map((item, index) => {
        this.activeStep = step;
        this.linkedList.getElementByIndex(index).value.active = step >= index + 1;
      });
    });
  }

  prev() {
    if (this.activeStep > 1) {
      this.activeStep--;
      this.activeStep$.next(this.activeStep);
    }
  };

  next() {
    if (this.activeStep < this.data.length) {
      this.activeStep++;
      this.activeStep$.next(this.activeStep);
    }
  };

  ngOnDestroy(): void {
    this.activeStepSubscription.unsubscribe();
  };
}
