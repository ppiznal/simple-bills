import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpUtils } from "../utils/httpClientUtils";
import { TransactionDto } from "../dto/transactionDto";
import { catchError, Observable, retry, tap } from "rxjs";
import { TransactionSearchService } from "./transaction-search.service";
import { environment } from "../environments/environment";
import { Transaction } from "../dto/transaction";

@Injectable({providedIn: "root"})
export class TransactionCrudService {

  private static host: string = environment.transactionManagementHost;
  private static endpoint: string = "/transactions";

  constructor(private httpClient: HttpClient, private transactionSearchService: TransactionSearchService) {
  }

  createTransaction(transaction: TransactionDto): Observable<string | Object> {
    const url = HttpUtils.prepareUrl(TransactionCrudService.host, TransactionCrudService.endpoint);
    return this.httpClient
      .post<string>(url, transaction, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        retry({count: 3, delay: 1000}),
        tap(strResponse => console.log(`Transaction with transactionNumber=${strResponse} created.`)),
        tap(() => this.transactionSearchService.refresh()),
        catchError(HttpUtils.handleError)
      )
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${HttpUtils.prepareUrlWithId(TransactionCrudService.host, TransactionCrudService.endpoint, transaction.transactionNumber)}`;
    return this.httpClient
      .patch<Transaction>(url, transaction, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        retry({count: 3, delay: 1000}),
        tap((updatedBill) => console.log(`Transaction with transactionNumber=${updatedBill.transactionNumber} updated.`)),
        tap(() => this.transactionSearchService.refresh()),
        catchError(HttpUtils.handleError)
      )
  }

  deleteBill(transactionNumber: number | string): Observable<number | Object> {
    const url = `${HttpUtils.prepareUrlWithId(TransactionCrudService.host, TransactionCrudService.endpoint, transactionNumber)}`;
    return this.httpClient
      .delete<string>(url, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap(() => console.log(`Transaction with transactionNumber=${transactionNumber} deleted.`)),
        tap(() => this.transactionSearchService.refresh()),
        catchError(HttpUtils.handleError)
      )
  }
}
