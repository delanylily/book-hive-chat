import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatchesComponent } from './matches.component';

const routes = [
  {
    path: '',
    component: MatchesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MatchesRoutingModule { }
