import { Component, OnInit } from '@angular/core';
import { UsageLimitPieChartService } from "../../../service/usage-limit-pie-chart.service";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-pie-usage-chart',
  templateUrl: './pie-usage-chart.component.html',
  styleUrls: ['./pie-usage-chart.component.scss']
})
export class PieUsageChartComponent implements OnInit {

  view: any[] = [450, 350];

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  maxLength: number = 35;

  colorScheme = {
    domain: [
      '#3F3B6C',
      '#624F82',
      '#9F73AB',
      '#A3C7D6',
      '#a5d6a3',
      '#646e3e',
      '#6e563e'],
  };

  constructor(public pieChartService: UsageLimitPieChartService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.pieChartService.refresh();
  }
}
