import { Category } from './../shared/interfaces';
import { CategoriesService } from './../shared/services/categories.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {


   // Инжектим сервис категорий
  constructor(private categoriesService: CategoriesService) { }
  


  // Делаем флаг для включения и отключения прелодера
  loading: Boolean = false;

  // Создаем переменную для полученных категорий с сервера
  categories: Category[] = [];


  ngOnInit(): void {
    this.loading = true;
    this.categoriesService.fetch().subscribe((categories) =>{
      // Кладем полученный категрии в переменную
      this.categories = categories;
      this.loading = false;
    });
  }

}
