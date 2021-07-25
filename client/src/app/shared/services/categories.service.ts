import { Observable } from 'rxjs';
import { Category } from './../interfaces';
// Сервис для работы с категориями

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



// Даем возможность инжектировать сервисы в класс
@Injectable({
   providedIn: 'root' //Автоматичеки регистриует сервис в главном модуле
})
export class CategoriesService
{
    constructor(private http: HttpClient){}


    // Получаем список всех категорий
    fetch(): Observable<Category []>
    {
       return this.http.get<Category []>('/api/category');
    }
}