import { CategoriesService } from './../../shared/services/categories.service';
import { ActivatedRoute, Params } from '@angular/router';
// Страница отвечает за 

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {


  // Инициализируем флаг, что бы узнать редактируем мы категорию или добавляем новую
  isNew: Boolean = true;


  //Инициализируем нашу форму
  form!: FormGroup; 



  // Инжектируем сервис активного роута
  constructor(private route: ActivatedRoute, private CategoriesService: CategoriesService) { }



 
  ngOnInit(): void {
    // Настраиваем форму
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });


    // Блокируем форму, пока идет щапрос на сервер
    this.form.disabled;


    

//Решаем редактируем категорию или добавляем новую.
    this.route.params.pipe(
      switchMap((params: Params): any => {
          if(params['id'])
          {
            this.isNew = false;

            return this.CategoriesService.getById(params['id'])
          }

          return of(null)
        }
      )
    ).subscribe(
      (category : any) => {
        if(category)
        {
          this.form.patchValue({
            name: category.name
          });

          MaterialService.updateTextInputs();
        }

        // Включаем форму после всех операций
        this.form.enable;
      },
      error => MaterialService.toast(error.error.message)
    );

  }



  // Обрабатываем отправку формы
  onSubmit()
  {

  }

}
