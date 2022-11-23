import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Cookie } from "ng2-cookies";
import { throwError } from "rxjs";
import { environment } from "../environments/environment";


@Injectable({providedIn: "root"})
export class OAuth2Service {
  public clientId = 'newClient';
  public redirectUri = environment.redirectUri;

  constructor(private _http: HttpClient) {
  }

  retrieveToken(code) {
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code', code);

    let oauth2TokenUrl = `${environment.tokenUrl}`
    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
    this._http.post(oauth2TokenUrl, params.toString(), {headers: headers})
      .subscribe(
        data => this.saveToken(data),
        err => this.handleError(err));
  }

  saveToken(token) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = this.redirectUri;
  }

  handleError(error) {
    alert('Error: ' + error.toString())
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

  checkCredentials() {
    return Cookie.check('access_token');
  }

  logout() {
    Cookie.delete('access_token');
    window.location.reload();
  }
}
