import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { TransactionsComponent } from './content/transactions/transactions.component';
import { CategoryComponent } from './content/category/category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbdSortableHeader } from "../utils/sortable.directive";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { LimitUsageChartsComponent } from './content/limit-usage-chart/limit-usage-charts.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PieUsageChartComponent } from "./content/pie-usage-chart/pie-usage-chart.component";
import { AssetsComponent } from './content/assets/assets.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent,
    TransactionsComponent,
    CategoryComponent,
    NgbdSortableHeader,
    LimitUsageChartsComponent,
    PieUsageChartComponent,
    AssetsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [DecimalPipe, DatePipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
