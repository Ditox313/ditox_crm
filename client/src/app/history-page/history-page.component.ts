import { Subscription } from 'rxjs';
import { OrderService } from './../shared/services/order.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { MaterialInstance, Order } from './../shared/interfaces';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';


// Константа для шага бесконечного скролла
const STEP = 5;

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

  // Тут хранится тултип
  tooltip: MaterialInstance | any;

  // Для отписки
  aSub: Subscription | any;

  // Для хранения все заказов
  orders: Order[]  = [];


  // Флаг для лодера
  loading: boolean | any = false;

  // Флаг для лодера страницы
  reloading: boolean | any = false;


  // Что бы убрать кнопку загрузки бесконечного скролла когда все элементы загружены
  noMoreOrders: boolean | any = false;

  // Переменные с отступом и лимитов для бесконечного скролла
  offset: any = 0;
  limit: any = STEP;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.reloading = true;
    this.fetch();
  }

  // Получаем все заказы
  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit,
    };

    this.aSub = this.orderService.fetch(params).subscribe((orders) => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP
      this.loading = false;
      this.reloading = false;
    });
  }

  ngOnDestroy() {
    this.tooltip.destroy();
    this.aSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initToolpip(this.tooltipRef);
  }


  // Метод для бесконечного скролла
  loadMore(){
    this.offset += STEP;
    this.fetch();
    this.loading = true;
  }
}
