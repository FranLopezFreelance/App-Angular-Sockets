import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  text = '';
  msgSubscription: Subscription;
  messages: any[] = [];
  messagesBox: HTMLElement;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
    // Selecciono el elemento de los mensajes para manipularlo
    this.messagesBox = document.getElementById('chat-messages');

    // Me suscribo al observable getMessages()
    this.msgSubscription = this.chatService.getMessages()
      .subscribe( message => {
        // Guardo el mensaje en el array de mensajes para mostrarlo
        this.messages.push( message );

        // Muevo el scroll al nuevo mensaje
        setTimeout(() => {
          this.messagesBox.scrollTop = this.messagesBox.scrollHeight;
        }, 200);
      });
  }

  ngOnDestroy() {
    // Me desuscribo de los mensajes
    this.msgSubscription.unsubscribe();
  }

  sendMessage() {

    if ( this.text.trim().length === 0) {
      return;
    }

    // Envío mensajes a través de chatService
    this.chatService.sendMessage( this.text );
    this.text = '';
  }

}
