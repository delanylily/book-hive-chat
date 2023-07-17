import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepCardComponent } from './components/step-card/step-card.component';
import { StepperComponent } from './components/stepper-container/stepper-container.component';
import { StepComponent } from './components/step/step.component';
import { BooksRoutingModule } from './books.routing.module';
import { FrameModule } from '../frame/frame.module';
import { HomeComponent } from './components/home/home.component';
import { RequestBookModule } from './components/request-book-modal/request-book.module';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule,
    FrameModule,
    RequestBookModule
  ],
  declarations: [
    HomeComponent,
    StepComponent,
    StepCardComponent,
    StepperComponent,
  ]
})
export class BooksModule { }
