import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit {

  // Получаем данные из родительского элемента
  @Input() orders: Order[] | any;

  

  constructor() { }

  ngOnInit(): void {
  }

}
