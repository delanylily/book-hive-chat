import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthModule } from './auth/auth.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChatModule } from './chat/chat.module';
import { Firestore } from 'firebase/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { FirestoreModule } from '@angular/fire/firestore';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './shared/state/reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    AuthModule,
    ChatModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({ User: userReducer }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    FirestoreModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
