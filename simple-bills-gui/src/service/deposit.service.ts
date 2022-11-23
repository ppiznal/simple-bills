import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { BehaviorSubject, catchError, debounceTime, Observable, Subject, switchMap, tap } from "rxjs";
import { Deposit } from "../dto/deposit";
import { HttpClient } from "@angular/common/http";
import { Balance } from "../dto/balance";
import { HttpUtils } from "../utils/httpClientUtils";
import { Transaction } from "../dto/transaction";

@Injectable({providedIn: "root"})
export class DepositService {

  private static host = environment.assetManagementHost;
  private static endpoint = "/deposits";

  private _findDeposits$ = new Subject<void>()
  private _deposits$ = new BehaviorSubject<Deposit[]>(null);
  private _loading$ = new BehaviorSubject<boolean>(true);

  constructor(private httpClient: HttpClient) {
    this._findDeposits$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this.findDeposits()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => this._deposits$.next(result))
  }

  private findDeposits(): Observable<Deposit[]> {
    const url = HttpUtils.prepareUrl(DepositService.host, DepositService.endpoint);
    return this.httpClient.get<Balance>(url, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }

  createDeposit(deposit: Deposit): Observable<string | Object> {
    const url = HttpUtils.prepareUrl(DepositService.host, DepositService.endpoint);
    return this.httpClient
      .post<string>(url, deposit, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap(strResponse => console.log(`Transaction with transactionNumber=${strResponse} created.`)),
        tap(() => this.refresh()),
        catchError(HttpUtils.handleError)
      )
  }

  updateDeposit(deposit: Deposit): Observable<Transaction> {
    const url = `${HttpUtils.prepareUrlWithId(DepositService.host, DepositService.endpoint, deposit.name)}`;
    return this.httpClient
      .patch<Transaction>(url, deposit, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap((updatedBill) => console.log(`Transaction with transactionNumber=${updatedBill.transactionNumber} updated.`)),
        tap(() => this.refresh()),
        catchError(HttpUtils.handleError)
      )
  }

  deleteDeposit(transactionNumber: number | string): Observable<number | Object> {
    const url = `${HttpUtils.prepareUrlWithId(DepositService.host, DepositService.endpoint, transactionNumber)}`;
    return this.httpClient
      .delete<string>(url, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap(() => console.log(`Transaction with transactionNumber=${transactionNumber} deleted.`)),
        tap(() => this.refresh()),
        catchError(HttpUtils.handleError)
      )
  }

  refresh() {
    this._findDeposits$.next();
  }

  get deposits$() {
    return this._deposits$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }
}
