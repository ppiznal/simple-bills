import { Component, OnInit } from '@angular/core';
import { OAuth2Service } from "../../service/oAuth2.service";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  title = 'simple-transactions-gui';
  public isLogged: boolean = false;

  constructor(private _service: OAuth2Service) {
  }

  ngOnInit() {
    this.isLogged = this._service.checkCredentials();
    let i = window.location.href.indexOf('code');
    if (!this.isLogged && i != -1) {
      this._service.retrieveToken(window.location.href.substring(i + 5));
    }
  }

  login() {
    window.location.href =
      `${environment.authUrl}?response_type=code&scope=openid%20write%20read&client_id=${this._service.clientId}`
      + `&redirect_uri=${this._service.redirectUri}`;
  }

  logout() {
    this._service.logout();
  }
}
