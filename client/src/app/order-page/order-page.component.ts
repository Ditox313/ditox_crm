import { Observable, Subscription } from 'rxjs';
import { OrderService } from './../shared/services/order.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { MaterialInstance, Order, OrderPosition } from '../shared/interfaces';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  // С помощью нее мы определим на какой странице мы находимся
  isRoot!: Boolean;

  // Получаем ноду модального окна
  @ViewChild('modal') modalRef!: ElementRef;

  // Переменная для модальной формы
  modal: MaterialInstance | any;

  // Флаг для переключения
  pending: any;


  // Подписка для отписки
  uSub: Subscription | any;






  constructor(private router: Router, public orderService: OrderService) {}

  ngOnInit(): void {
    // Если мы находимся на странице order, то isRoot равен true
    this.isRoot = this.router.url === '/order';

    // Подписываемся на изменение адреса в роутинге. Когда url будет менятся, мы будем манипулировать is Root
    this.router.events.subscribe((event) => {
      // Делаем проверку что бы проверять только на определенном событии
      if (event instanceof NavigationEnd) {
        // Если мы находимся на странице order, то isRoot равен true
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngOnDestroy(): void {
    this.modal.destroy();
    if(this.uSub)
    {
      this.uSub.unsubscribe();
    }
  }

  // Когда загрузится контент
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModalPos(this.modalRef);
  }

  // Открываем мадольную форму
  openModal() {
    this.modal.open();
  }

  // Закрываем модальную форму
  cancelModal() {
    this.modal.close();
  }

  // Сохряняем данные из модальной форме на подтверждении заказа
  submitModal() {
    this.pending = true;

    // Сначала избавляемся от id
    const order: Order = {
      list: this.orderService.list.map(item => {
        delete item._id
        return item
      })
    }

    this.uSub = this.orderService.create(order).subscribe(
      (newOrder) => {
        MaterialService.toast(`Заказ № ${newOrder.order} был добавлен`);
        this.orderService.clear();
      },
      (error) => MaterialService.toast(error.error.message),
      () => {
        this.modal.close();
        this.pending = false;
      }
    );
  }



  // Удаляем позицию из заказа
  removePosition(orderPosition: OrderPosition)
  {
    this.orderService.remove(orderPosition);
  }
}
