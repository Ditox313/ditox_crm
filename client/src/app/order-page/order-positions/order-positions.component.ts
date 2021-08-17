import { MaterialService } from 'src/app/shared/classes/material.service';
import { OrderService } from './../../shared/services/order.service';
import { Observable } from 'rxjs';
import { PositionsService } from './../../shared/services/positions.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Position } from 'src/app/shared/interfaces';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css'],
})
export class OrderPositionsComponent implements OnInit {
  // Стрим для хранения позиций
  positions$!: Observable<Position[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService
  ) {}

  ngOnInit(): void {
    // Находим id и получаем список позиций по данной категории
    this.positions$ = this.route.params.pipe(
      // Переключаемся на другой стрим
      switchMap((params: Params) => {
        return this.positionsService.fetch(params['id']);
      }),
      // Добавляем к каждой позиции дефолтное значение в колличество равное 1
      map((positions:Position[]) =>{
        return positions.map((position) => {
          position.quantity = 1;
          return position;
        })
      })
    );
  }

  // Добавить позицию в заказ
  addToOrder(position: Position)
  {
    MaterialService.toast(`Позиция успешно добавлена в заказ`);
    this.order.add(position);
  }
}
