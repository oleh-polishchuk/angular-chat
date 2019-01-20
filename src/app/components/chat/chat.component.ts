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
  }

  submit(chatId) {
    if (!this.newMessage) {
      return;
    }

    this.chatService.sendMessage(chatId, this.newMessage);
    this.newMessage = '';
  }

}
