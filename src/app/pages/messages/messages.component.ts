import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  public user: User = null;

  constructor(
    public webSocketService: WebsocketService
  ) { }

  ngOnInit() {

    this.webSocketService.loadStorage();
    this.user = this.webSocketService.user;
  }

}
