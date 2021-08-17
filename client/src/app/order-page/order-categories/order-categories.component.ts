import { Category } from './../../shared/interfaces';
import { Observable } from 'rxjs';
import { CategoriesService } from './../../shared/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  // Заводим стрим , куда попадут категории пролученные из сервиса
  categories$!: Observable<Category[]>;





  constructor(private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {

    // Получаем список всех категорий
    this.categories$ = this.categoriesService.fetch();
  }

}
