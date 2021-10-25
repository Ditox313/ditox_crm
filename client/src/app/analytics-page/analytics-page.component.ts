import { Subscription } from 'rxjs';
import { AnalyticsService } from './../shared/services/analytics.service';
import { Chart, registerables } from 'chart.js';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { AnalyticsPage } from '../shared/interfaces';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css'],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  // Получаем канвасы
  @ViewChild('gain') gainRef: ElementRef | any;
  @ViewChild('order') orderRef: ElementRef | any;

  // Средний чек
  average: string | number | any;

  // Флаг загрузки
  pending: Boolean = true;

  // Подписка
  uSub: Subscription | any;

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit(): void {
    // Создаем конфигурацию для графика выручки
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255,99,32)',
    };

    // Создаем конфигурацию для графика заказов
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54,162,235)',
    };

    // Регистрируем все необходимые сущности библиотеки chart
    Chart.register(...registerables);

    this.uSub = this.analyticsService
      .getAnalytics()
      .subscribe((data: AnalyticsPage) => {
        this.average = data.average.toLocaleString('ru-RU');

        // Заносим данные графика выручки в конфигурацию
        gainConfig.labels = data.chart.map((item) => item.label);
        gainConfig.data = data.chart.map((item) => item.gein);

        // Получаем контекст графика выручки
        const gainCtx = this.gainRef.nativeElement.getContext('2d');
        gainCtx.canvas.height = '300px';

        // Рисуем график Выручки
        new Chart(gainCtx, createChartConfig(gainConfig));









        
        // Заносим данные графика заказов в конфигурацию
        orderConfig.labels = data.chart.map((item) => item.label);
        orderConfig.data = data.chart.map((item) => item.order);

        // Получаем контекст графика заказов
        const orderCtx = this.orderRef.nativeElement.getContext('2d');
        orderCtx.canvas.height = '300px';

        // Рисуем график заказов
        new Chart(orderCtx, createChartConfig(orderConfig));

        this.pending = false;
      });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}






// Функция которая генерирует конфигурацию для графиков
function createChartConfig({ labels, data, label, color }: any): any {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  };
}
