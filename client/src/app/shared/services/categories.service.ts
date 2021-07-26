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




   //  Получаем категорию по id. Передаем id для бэкэнд роута
   getById(id: string): Observable<Category>
   {
      return this.http.get<Category>(`api/category/${id}`);
   }




   // Создаем категрию
   create(name: string, image?: File): Observable<Category>
   {
      // Формируем объект для отправки на сервер
      const fd = new FormData();

      // Добавляем в formdata картинку , если она есть
      if(image)
      {
         fd.append('image', image, image.name);
      }

      // Добавляем в formdata имя категории
       fd.append('name', name);



      return this.http.post<Category>('/api/category', fd);
   }





   // Обновляем  категорию
   update(id:string, name: string, image?: File): Observable<Category>
   {
      // Формируем объект для отправки на сервер
      const fd = new FormData();

      // Добавляем в formdata картинку , если она есть
      if(image)
      {
         fd.append('image', image, image.name);
      }

      // Добавляем в formdata имя категории
       fd.append('name', name);

       


      //  Делаем запрос с передачей id
      return this.http.patch<Category>(`/api/category/${id}`, fd);
   }
}