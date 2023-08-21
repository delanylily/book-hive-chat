import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddBookComponent } from "./components/add-book/add-book.component";
import { UserMainComponent } from "./components/main/user-main.component";

const routes = [
  {
    path: '',
    component: UserMainComponent
  },
  {
    path: 'add-book',
    component: AddBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
