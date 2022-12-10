import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserService } from "../../../service/user.service";
import { BalanceService } from "../../../service/balance.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUsername: Observable<string>;

  constructor(public balanceService: BalanceService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.loggedUsername = this.getUser();
    this.balanceService.refresh();
  }

  getUser(): Observable<string> {
    return this.userService
      .getUser()
  }
}
