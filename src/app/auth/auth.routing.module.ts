import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { SigninComponent } from "./components/signin/signin.component";

type PathMatch = "full" | "prefix" | undefined;

const routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' as PathMatch },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
