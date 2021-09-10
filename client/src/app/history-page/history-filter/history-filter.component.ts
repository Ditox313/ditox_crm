import { MaterialService } from 'src/app/shared/classes/material.service';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { Filter, MaterialDatepicker } from 'src/app/shared/interfaces';



@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css'],
})
export class HistoryFilterComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  // Создаем контейнер для отправки данных в родительский компонент
  @Output() onFilter = new EventEmitter<Filter>();

  // Храним номер заказа для фильтра
  order: Number | any;

  // Храним дату начала
  start: MaterialDatepicker | any;

  // Храним дату конца
  end: MaterialDatepicker | any;

  // Получаем дату начала
  @ViewChild('start') startRef: ElementRef | any;

  // Получаем дату конца
  @ViewChild('end') endRef: ElementRef | any;


  // Валидность
  isValid: any = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.start.destroy();
    this.end.destroy();
  }


  // Инициализируем датепикеры когда загрузится весь дом контент
  ngAfterViewInit() {
    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this));
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this));
  }


  // Валидация
  validate() {
    if(!this.start.date || !this.end.date)
    {  
      this.isValid = true;
      return;
    }

    this.isValid = this.start.date < this.end.date;
  }




  // Обработчик фильтра
  submitFilter() {
    const filter: Filter = {

    };

    if (this.order) {
      filter.order = this.order;
    }

    if(this.start.date)
    {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }

    this.onFilter.emit(filter);
  }
}
