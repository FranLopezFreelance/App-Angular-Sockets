import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public webSocketService: WebsocketService
  ) { }

  sendMessage( message: string ) {

    const payload = {
      user : 'Francisco',
      text: message
    };

    this.webSocketService.emit('message', payload );

  }

  getMessages() {

    // Retorno el Observable que devuelve el listen
    return this.webSocketService.listen('new-message');

  }
}
