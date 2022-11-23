import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Cookie } from "ng2-cookies";
import { throwError } from "rxjs";


export class HttpUtils {

  public static X_TOTAL_COUNT = 'x-total-count';
  public static PAGE_SIZE = "pageSize";
  public static PAGE_NUMBER = "pageNumber";
  public static DATE_FROM = "dateFrom";
  public static DATE_TO = "dateTo";
  public static SORT_DIRECTION = "sortDirection";
  public static SORT_COLUMN = "sortColumn";


  public static prepareUrl(host: string,
                           endpoint: string): string;
  public static prepareUrl(host: string,
                           endpoint: string,
                           pageSize: number): string;
  public static prepareUrl(host: string,
                           endpoint: string,
                           pageSize: number,
                           pageNumber: number,
                           sortDirection: string,
                           sortColumn: string,
                           dateFrom: Date,
                           dateTo: Date): string;
  public static prepareUrl(host?: string,
                           endpoint?: string,
                           pageSize?: number,
                           pageNumber?: number,
                           sortDirection?: string,
                           sortColumn?: string,
                           dateFrom?: Date,
                           dateTo?: Date): string {
    let url = `${host}${endpoint}`;
    const queryParams: string [] = [];
    if (pageSize) {
      queryParams.push(HttpUtils.getUrlParam(this.PAGE_SIZE, pageSize.toString()))
    }
    if (pageNumber) {
      queryParams.push(HttpUtils.getUrlParam(this.PAGE_NUMBER, pageNumber.toString()))
    }
    if (sortDirection) {
      queryParams.push(HttpUtils.getUrlParam(this.SORT_DIRECTION, sortDirection.toUpperCase()))
    }
    if (sortColumn) {
      queryParams.push(HttpUtils.getUrlParam(this.SORT_COLUMN, sortColumn))
    }
    if (dateFrom) {
      queryParams.push(HttpUtils.getUrlParam(this.DATE_FROM, dateFrom.toString()))
    }
    if (dateTo) {
      queryParams.push(HttpUtils.getUrlParam(this.DATE_TO, dateTo.toString()))
    }
    return queryParams.length === 0 ?
      url : `${url}?${queryParams.join("&")}`;
  }

  static prepareUrlWithId(host: string, endpoint: string, id: string | number) {
    return `${host}${endpoint}/${id}`;
  }

  public static prepareHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
  }

  // todo - enhance error handling
  public static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      alert("Some netork error detected. Please try again later!")
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);

      switch (error.status) {
        case 409: {
          alert("Error. An object with given name/key already exists!")
        }
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private static getUrlParam(paramName: string, paramValue: string): string {
    return `${paramName}=${paramValue}`;
  }
}


