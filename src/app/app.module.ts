import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatServiceService } from './components/shared/services/chat-service.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

const config = {
  apiKey: 'AIzaSyAMUFM2zz24GHNJ_50kIvNHZpR6YWbKLy8',
  authDomain: 'spdu-html-homework-10.firebaseapp.com',
  databaseURL: 'https://spdu-html-homework-10.firebaseio.com',
  projectId: 'spdu-html-homework-10',
  storageBucket: 'spdu-html-homework-10.appspot.com',
  messagingSenderId: '934812704997'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
  ],
  providers: [
    ChatServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
