import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap } from "rxjs";
import { HttpUtils } from "../utils/httpClientUtils";
import { Category } from "../dto/category";
import { map } from "rxjs/operators";
import { TransactionType } from "../dto/transaction";

@Injectable({providedIn: "root"})
export class CategoryService {

  private static host = environment.planningHost
  private static endpoint = "/categories"

  public categories$: Observable<Category[]>;


  constructor(private httpClient: HttpClient) {
    this.categories$ = this.findCategories();
  }

  createCategory(category: Category): Observable<string | Object> {
    const url = HttpUtils.prepareUrl(CategoryService.host, CategoryService.endpoint);
    return this.httpClient
      .post<Category>(url, category, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap(category => console.log(`Category with name ${category.name} created.`)),
        catchError(HttpUtils.handleError)
      )
  }

  updateCategory(category: Category): Observable<string | Object> {
    const url = HttpUtils.prepareUrlWithId(CategoryService.host, CategoryService.endpoint, category.name);
    return this.httpClient
      .patch<Category>(url, category, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        tap(category => console.log(`Category with name ${category.name} updated.`)),
        catchError(HttpUtils.handleError)
      )
  }

  findCategories(transactionType?: TransactionType): Observable<Category[]> {
    const url = HttpUtils.prepareUrl(CategoryService.host, CategoryService.endpoint);
    return this.httpClient.get<Category[]>(url, {headers: HttpUtils.prepareHeaders()})
      .pipe(
        map(categories => this.filterCategories(categories, transactionType)),
        catchError(HttpUtils.handleError),
        tap(console.log)
      );
  }

  deleteCategory(categoryName: string, categoryToReplace: string): Observable<string | Object> {
    const queryParam = categoryToReplace != null ? `?replacementCategory=${categoryToReplace}` : "";
    const url = HttpUtils.prepareUrlWithId(CategoryService.host, CategoryService.endpoint, categoryName) + queryParam;
    return this.httpClient
      .delete(url, {headers: HttpUtils.prepareHeaders(), observe: 'response'})
      .pipe(
        tap(categoryName => console.log(`Category with name ${categoryName.body} deleted.`)),
        catchError(HttpUtils.handleError)
      )
  }

  filterCategories(categories: Category[], transactionType?: TransactionType): Category[] {
    return transactionType ?
      categories.filter(category => category.transactionType === transactionType) : categories;
  }
}
