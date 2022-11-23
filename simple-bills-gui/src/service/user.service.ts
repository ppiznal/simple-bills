import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { HttpUtils } from "../utils/httpClientUtils";
import { environment } from "../environments/environment";
import { User } from "../dto/user";
import { map } from "rxjs/operators";


@Injectable({providedIn: "root"})
export class UserService {

  private static host: string = environment.transactionManagementHost;
  private static userEndpoint: string = "/user";

  constructor(private httpClient: HttpClient) {
  }

  getUser(): Observable<string> {
    return this.httpClient.get<User>(
      HttpUtils.prepareUrl(UserService.host, UserService.userEndpoint),
      {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map(response => response.body),
        tap(console.log),
        map(this.getShowUserName)
      );
  }

  getShowUserName(user: User): string {
    if (user.givenName) {
      return user.givenName;
    } else if (user.name) {
      return user.name;
    } else if (user.preferredUsername) {
      return user.preferredUsername;
    }
  }
}
