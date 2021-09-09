import { MaterialService } from 'src/app/shared/classes/material.service';
import { MaterialInstance } from './../shared/interfaces';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  // Флаг для фильтра
  isFilterVisible: Boolean | any;

  // Получаем тултип
  @ViewChild('tooltip') tooltipRef: ElementRef | any;

  tooltip: MaterialInstance | any;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.tooltip.destroy();
  }

  ngAfterViewInit(){
    this.tooltip = MaterialService.initToolpip(this.tooltipRef);
  }
}
