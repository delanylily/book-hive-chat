import { NgModule } from "@angular/core";
import { ChatComponent } from "./chat.component";
import { RouterModule } from "@angular/router";

const routes = [
  {
    path: '',
    component: ChatComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
