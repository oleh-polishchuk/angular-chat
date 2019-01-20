import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userChats$;

  constructor(
    private chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.userChats$ = this.chatService.getUserChats();
  }

  createChat() {
    this.chatService.create();
  }
}
