import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public user: User = null;

  constructor( private socket: Socket ) {
    this.checkStatus();
    this.loadStorage();
  }

  // Checkear las conexiones
  checkStatus() {
    // Devuelve un Observable
    this.socket.on('connect', () => {

      this.socketStatus = true;

    });

    // Devuelve un Observable
    this.socket.on('disconnect', () => {

      this.socketStatus = false;

    });
  }

  // Emitir eventos
  emit( event: string, payload?: any, callback?) {

    this.socket.emit( event, payload, callback );

  }

  // Escuchando eventos
  listen( event: string ) {

    // Regreso un observable
    return this.socket.fromEvent( event );

  }

  loginWS( name: string ) {

    return new Promise( (resolve, reject) => {

      this.emit( 'user-config', { name }, resp => {

        this.user = new User( name );

        this.saveInStorage();

        resolve();
      });
    });
  }

  getUser() {
    // Retorno el usuario
    return this.user;
  }

  saveInStorage() {

    localStorage.setItem( 'user', JSON.stringify( this.user ));

  }

  loadStorage() {
    if ( localStorage.getItem( 'user' ) ) {

      this.user = JSON.parse( localStorage.getItem('user') );

      this.loginWS( this.user.name );

    }
  }

}
