import { NgModule } from '@angular/core';
import { UserComponent } from './components/main-user/user.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: UserComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
