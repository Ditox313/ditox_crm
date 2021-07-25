import { ActivatedRoute, Params } from '@angular/router';
// Страница отвечает за 

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  // Инициализируем флаг, что бы узнать редактируем мы категорию или добавляем новую
  isNew: Boolean = true;


  // Инжектируем сервис активного роута
  constructor(private route: ActivatedRoute) { }


  // Метод решает редактируем мы категорию или добавляем новую
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{

      if(params['id'])
      {
        // Если мы редактируем категорию, от ставим флаг в значение false
        this.isNew = false;
        // Мы редактируем
      }
    });
  }

}
