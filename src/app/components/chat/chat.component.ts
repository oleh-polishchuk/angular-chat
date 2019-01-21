import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chat$;
  newMessage = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    this.chat$ = this.chatService.getById(chatId);
    this.chat$.subscribe(value => this.scrollDown());
  }

  submit(chatId) {
    if (!this.newMessage) {
      return;
    }

    this.chatService.sendMessage(chatId, this.newMessage);
    this.newMessage = '';
    this.scrollDown();
  }

  scrollDown() {
    const element = document.querySelector('.chat__messages');
    if (element) {
      setTimeout(() => {
        element.scrollBy(0, element.scrollHeight * 2);
      });
    }
  }

}
