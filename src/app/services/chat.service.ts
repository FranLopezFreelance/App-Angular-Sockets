import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public webSocketService: WebsocketService
  ) { }

  sendMessage( message: string ) {

    // const messageObj = JSON.parse( message );
    const payload = {
      user: this.webSocketService.getUser().name,
      text: message
    };

    this.webSocketService.emit('message', payload );

  }

  getPrivateMessage() {
    return this.webSocketService.listen('new-private-message');
  }

  getMessages() {

    // Retorno el Observable que devuelve el listen
    return this.webSocketService.listen('new-message');
  }
}
