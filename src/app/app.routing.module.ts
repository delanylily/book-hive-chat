import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { redirectLoggedInTo, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes = [
  { path: 'home', loadChildren: () => import('./home/books.module').then(m => m.BooksModule) },
  { path: 'matches', loadChildren: () => import('./matches/matches.module').then(m => m.MatchesModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },


  {
    path: 'auth',
    ...canActivate(() => redirectLoggedInTo(['home'])),
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
