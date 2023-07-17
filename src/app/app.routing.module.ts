import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes = [
  {
    path: 'auth',
    ...canActivate(() => redirectLoggedInTo(['chat'])),
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'chat',
    ...canActivate(() => redirectUnauthorizedTo(['signin'])),
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
