import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
    this.checkStatus();
  }

  checkStatus() {
    // Observable
    this.socket.on('connect', () => {

      console.log('Conectado al servidor');

      this.socketStatus = true;

    });

    // Observable 
    this.socket.on('disconnect', () => {

      console.log('Desconectado del servidor');

      this.socketStatus = false;

    });
  }

  emit( event: string, payload?: any, callback?: VoidFunction) {

    console.log('Emitiendo', event);

    this.socket.emit( event, payload, callback );

  }

  listen( event: string ) {

    // Regreso un observable
    return this.socket.fromEvent( event );

  }

}
