import { MaterialService } from 'src/app/shared/classes/material.service';
import { OverviewPage, MaterialInstance } from './../shared/interfaces';
import { Observable } from 'rxjs';
import { AnalyticsService } from './../shared/services/analytics.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css'],
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  data$!: Observable<OverviewPage>;

  // Переменная для тултипа
  tapTarget: MaterialInstance | any;

  // Получаем тултип
  @ViewChild('tapTarget') tapTargetRef: ElementRef | any;


  yesterday = new Date();





  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview();

    // Высчитываем вчерашнюю дату
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef);
  }

  ngOnDestroy(): void {
    this.tapTarget.destroy();
  }

  openInfo()
  {
    this.tapTarget.open();
  }
}
