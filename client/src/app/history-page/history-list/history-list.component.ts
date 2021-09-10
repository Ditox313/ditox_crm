import { MaterialService } from 'src/app/shared/classes/material.service';
import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Order, MaterialInstance } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  // Получаем данные из родительского элемента
  @Input() orders: Order[] | any;

  // Получаем модальное окно
  @ViewChild('modal') modalRef: ElementRef | any;
  modal: MaterialInstance | any;

  // Текущий заказ
  selectedOrder: Order | any;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModalPos(this.modalRef);
  }

  // Считаем сумму заказа в листе
  computePrice(order: Order) {
    return order.list.reduce((total, item) => {
      return (total += item.quantity * item.cost);
    }, 0);
  }

  // Для открытия заказа в модальном окне
  selectOrder(order: Order) {
    this.selectedOrder = order;
    console.log(this.selectedOrder);
    this.modal.open();
  }

  // Закрываем модальное окно
  closeModal(){
    this.modal.close();
  }
}
