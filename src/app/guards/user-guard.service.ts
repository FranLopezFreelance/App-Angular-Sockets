import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    public webSocketService: WebsocketService,
    private router: Router
    ) { }

  canActivate() {
    if ( this.webSocketService.getUser() ) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
