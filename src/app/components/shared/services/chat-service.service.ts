import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';

interface Message {
  uid: string;
  content: string;
  createdAt: number;
}

interface Chat {
  id?: string;
  uid: string;
  createdAt: number;
  count: number;
  messages: any;
}

@Injectable()
export class ChatService {

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private router: Router,
  ) {
  }

  async create() {
    const uid = 'UID123456789';

    const initMessage = {
      uid,
      content: 'This is very beginning of your message history',
      createdAt: Date.now(),
    };

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: {},
    };

    const newDocumentKey = this.angularFireDatabase.list('chats').push(data).key;
    this.angularFireDatabase.list(`chats/${newDocumentKey}/messages`).push(initMessage);

    return this.router.navigate(['chats', newDocumentKey]);
  }

  getById(chatId) {
    return this.angularFireDatabase.object(`chats/${chatId}`)
      .snapshotChanges()
      .pipe(
        map(item => {
          const data = item.payload.val() as Chat;
          data.id = item.key as string;
          data.messages = Object.values(data.messages);
          return data;
        })
      );
  }

  getUserChats() {
    return this.angularFireDatabase.list('chats')
      .snapshotChanges()
      .pipe(
        map(items => {
          return items.map(item => {
            const data = item.payload.val() as Chat;
            data.messages = Object.values(data.messages) as Message[];
            // TODO: use UID instead of key
            const id = item.key;

            return { id, ...data };
          });
        })
      );
  }

  sendMessage(chatId: string, content: string) {
    const uid = 'UID123456789';

    const data = {
      uid,
      content,
      createdAt: Date.now(),
    };

    this.angularFireDatabase.list(`chats/${chatId}/messages`).push(data);
  }
}
