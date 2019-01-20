import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class ChatService {

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private router: Router,
  ) {
  }

  async create() {
    const uid = 'UID123456789';

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: [],
    };

    const newDocumentKey = this.angularFireDatabase.list('chats').push(data).key;

    return this.router.navigate(['chats', newDocumentKey]);
  }


  getUserChats() {
    return this.angularFireDatabase.list('chats')
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
            return { id: item.key, ...item};
          });
        })
      );
  }
}
