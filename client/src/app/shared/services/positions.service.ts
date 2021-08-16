import { Message } from './../interfaces';
// Сервис позиций
import { Position } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


// Даем возможность инжектировать сервисы в класс
@Injectable({
  providedIn: 'root', //Автоматичеки регистриует сервис в главном модуле
})
export class PositionsService {
  constructor(private http: HttpClient) {}

  // Получаем список всех категорий
  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`);
  }

  // Создаем новую позицию
  create(position: Position): Observable<Position> {
    return this.http.post<Position>(`/api/position`, position);
  }

  // Редактируем позицию
  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position);
  }

  // Удалить позицию
  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`);
  }
}