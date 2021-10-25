
import { HistoryFilterComponent } from './../history-page/history-filter/history-filter.component';
import { OrderService } from './services/order.service';

// Интерфейсы


// Интерфейс для юзера
export interface User
{
    email: string,
    password: string
}


// Интерфейс для категории
export interface Category
{
    name: string,
    imageSrc?: string
    user?: string,
    _id?: string
}



//Интерфейс для сообщения
export interface Message
{
    message: string
}



// Интерфейс для позиций
export interface Position
{
    name: string,
    cost: string,
    category: string,
    user?: string,
    _id?: string ,
    quantity?: number
}



// Интерфейс для материалайза
export interface MaterialInstance
{
    open?(): void
    close?(): void
    destroy?(): void
}




// Интерфейс для общего заказа
export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  list: OrderPosition[];
  _id?: string;
}



// Интерфейс для позиции заказа
export interface OrderPosition
{
    name: string,
    cost: number,
    quantity: number,
    _id?: string
}



// Интерфейс для фильтра
export interface Filter
{
    start?:Date,
    end?: Date,
    order?: Number
}




// Интерфейс для датепикера
export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
}



// Интерфейс для overview page
export interface OverviewPage {
  orders: OverviewPageItem;
  gain: OverviewPageItem;
}


export interface OverviewPageItem
{
    percent: number,
    compare: number,
    yesterday: number,
    isHigher: boolean
}
