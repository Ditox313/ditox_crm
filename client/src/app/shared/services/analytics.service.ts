import { AnalyticsPage, OverviewPage } from './../interfaces';
import { Observable } from 'rxjs';
// Сервис авторизации
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Message } from './../interfaces';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  //Получаем данные overview
  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview');
  }

  // Получаем данные для аналитики
  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/analytics');
  }
}
