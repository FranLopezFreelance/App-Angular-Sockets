import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = '';

  constructor(
    public webSocketService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {

    this.webSocketService.loginWS( this.name )
      .then( () => {

        this.router.navigateByUrl('/mensajes');

      });
  }

}
