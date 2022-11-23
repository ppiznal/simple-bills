import { Injectable, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, debounceTime, Observable, Subject, switchMap, tap } from "rxjs";
import { Transaction } from "../dto/transaction";
import { map } from "rxjs/operators";
import { DatePipe, DecimalPipe } from "@angular/common";
import { PageableTransactions } from "../dto/pageableTransactions";
import { SortableState, SortDirection } from "../utils/sortable.directive";
import { HttpUtils } from "../utils/httpClientUtils";
import { environment } from "../environments/environment";


@Injectable({providedIn: "root"})
export class TransactionSearchService {

  private static host: string = environment.transactionManagementHost;
  private static endpoint: string = "/transactions";
  private _pageableTransactions$ = new BehaviorSubject<PageableTransactions>(null);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>()

  private _state: SortableState = {
    sortColumn: '',
    sortDirection: '',
    pageNumber: 1,
    pageSize: 5,
    searchTerm: '',
    dateFrom: null,
    dateTo: null
  };

  constructor(private httpClient: HttpClient, private decimalPipe: DecimalPipe, private datePipe: DatePipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => this._pageableTransactions$.next(result));
  }

  public refresh() {
    this._search$.next();
  }

  private findTransactions(pageSize: number,
                           pageNumber: number,
                           sortDirection: string,
                           sortColumn: string,
                           dateFrom: Date,
                           dateTo: Date): Observable<PageableTransactions> {

    let url = HttpUtils.prepareUrl(TransactionSearchService.host, TransactionSearchService.endpoint, pageSize, pageNumber, sortDirection, sortColumn, dateFrom, dateTo);
    return this.httpClient.get<Transaction[]>(url, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        map((response) => {
          return new PageableTransactions(response.body, Number(response.headers.get(HttpUtils.X_TOTAL_COUNT)));
        }),
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }

  private _search(): Observable<PageableTransactions> {
    const {sortColumn, sortDirection, pageSize, pageNumber, searchTerm, dateFrom, dateTo} = this._state;
    let pageableBills$ = this.findTransactions(pageSize, pageNumber, sortDirection, sortColumn, dateFrom, dateTo).pipe()
    pageableBills$ = TransactionSearchService.search(pageableBills$, searchTerm, this.decimalPipe, this.datePipe)
    return pageableBills$
      .pipe(
        map(pageableBills => TransactionSearchService.setAmountSum(pageableBills)),
        tap(console.log));
  }

  private static search(transactions: Observable<PageableTransactions>,
                        text: string,
                        decimalPipe: PipeTransform,
                        datePipe: DatePipe): Observable<PageableTransactions> {
    return transactions.pipe(
      map(pageableTransactions => {
        const transactions = this.matchBills(pageableTransactions, text, decimalPipe, datePipe);
        return new PageableTransactions(transactions, pageableTransactions.totalCount);
      }))
  }

  public static setAmountSum(pageableBills: PageableTransactions): PageableTransactions {
    pageableBills.pageTotalAmount = this.countAmountSum(pageableBills.transactions)
    return pageableBills;
  }

  private static countAmountSum(transactions: Transaction[]): number {
    return transactions
      .map((transaction) => transaction.amount)
      .map(amount => amount == null ? 0 : amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }

  private static matchBills(pageableTransaction: PageableTransactions, text: string, decimalPipe: PipeTransform, datePipe: DatePipe) {
    return pageableTransaction.transactions.filter(transaction => {
      const term = text.toLowerCase();
      return decimalPipe.transform(transaction.transactionNumber).includes(term)
        || transaction.type.toString().toLowerCase().includes(term)
        || datePipe.transform(transaction.date).includes(term)
        || decimalPipe.transform(transaction.amount).includes(term)
        || transaction.description.toLowerCase().includes(term)
        || transaction.category.toLowerCase().includes(term);
    });
  }

  // getters and setters to wrapped objects
  get pageableTransactions$() {
    return this._pageableTransactions$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.pageNumber;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  get dateFrom() {
    return this._state.dateFrom;
  }

  get dateTo() {
    return this._state.dateTo;
  }

  set page(page: number) {
    this._set({pageNumber: page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set sortColumn(sortColumn: string) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  set dateFrom(dateFrom: Date) {
    this._set({dateFrom});
  }

  set dateTo(dateTo: Date) {
    this._set({dateTo});
  }

  private _set(patch: Partial<SortableState>) {
    Object.assign(this._state, patch);
    this.refresh();
  }
}
