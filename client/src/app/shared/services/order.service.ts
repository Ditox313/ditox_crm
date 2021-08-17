import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Order, OrderPosition, Position } from 'src/app/shared/interfaces';
import { Injectable } from '@angular/core';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})



export class OrderService {
  // Контейнер для хранения позиций добавленных в заказ
  public list: OrderPosition[] = [];

  // Общая цена заказа
  public orderPrice = 0;

  

  constructor(private http: HttpClient) {}

  // Добавить позицию в заказ в заказ
  add(position: Position) {
    // Клонируем объект позиции, для исключения мутации
    const orderPosition: OrderPosition | any = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });







    // Исключим дубли позиций в заказе. Проверяем есть ли аналогичная позиция в заказе
    const candidatePos = this.list.find((pos) => pos._id === orderPosition._id);

    if (candidatePos) {
      // Увеличиваем колличество
      candidatePos.quantity += orderPosition.quantity;
    }
    else{
      // Добавляем позицию в список заказов
      this.list.push(orderPosition);
    }


    // Вызываем метод для подсчета суммы заказа
    this.summPrice();
  }







  // Метод подсчета суммы заказа
  private summPrice()
  {
    this.orderPrice = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0);
  }







  // Удалить определенный элемент из заказа
  remove(orderPosition: OrderPosition) {
    const idxPos = this.list.findIndex(pos => pos._id === orderPosition._id);
    this.list.splice(idxPos, 1);
    this.summPrice();
  }







  // Чистит форму после отправки на сервер
  clear() {
    this.list = [];
    this.orderPrice = 0;
  }




  // Создаем новый заказ и отправляем его на сервер
  create(order: Order) : Observable<Order>
  {
    console.log(order);
    return this.http.post<Order>('/api/order', order);
    
    
  }
}
