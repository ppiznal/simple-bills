import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieUsageChartComponent } from './pie-usage-chart.component';

describe('PieUsageChartComponent', () => {
  let component: PieUsageChartComponent;
  let fixture: ComponentFixture<PieUsageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieUsageChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieUsageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
