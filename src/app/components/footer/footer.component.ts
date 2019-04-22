import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public socketStatus = false;

  constructor(
    public webSocketService: WebsocketService
  ) {
    this.socketStatus = this.webSocketService.socketStatus;
  }

}
