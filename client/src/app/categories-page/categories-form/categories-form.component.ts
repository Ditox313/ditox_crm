import { Category } from './../../shared/interfaces';
import { CategoriesService } from './../../shared/services/categories.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  // Забираем дом элемент input загрузки файла и ложим его в переменную inputgRef
  @ViewChild('input') inputRef!: ElementRef;



  // Задаем переменную для хранения картинки после пото как загрузили с устройтста
  image!: File




  // Инициализируем флаг, что бы узнать редактируем мы категорию или добавляем новую
  isNew: Boolean = true;


  //Инициализируем нашу форму
  form!: FormGroup; 



  // Превью категории
  imagePreview : any = '';



  // Текущая категория
  category!: any;



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
        // Если есть id, ставим флаг и получаем категорию из сервиса
          if(params['id'])
          {
            this.isNew = false;

            return this.CategoriesService.getById(params['id'])
          }

          // Иначе возвращаем пустой стрим
          return of(null)
        }
      )
    ).subscribe(
      (category : any) => {
        // Если есть категория, то меняем плейсхолдер на имя категории
        if(category)
        {
          // Сохраняем текущую категори в переменную
          this.category = category;

          

          // Меняем имя категории
          this.form.patchValue({
            name: category.name
          });


          // Получаем картинку категории
          this.imagePreview = category.imageSrc;

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
    let obs$
    this.form.disable();

    if(this.isNew)
    {
      // Вызываем метод создания категории из сервиса категории
     obs$ = this.CategoriesService.create(this.form.value.name, this.image);

     
    }
    else
    {
      // Вызываем метод обновления категории из сервиса категории
       obs$ = this.CategoriesService.update(this.category._id ,this.form.value.name, this.image);

    }

    obs$.subscribe(
      (category : any) => {
       MaterialService.toast('Изменения сохранены');
       this.form.enable;
       
      },
      error => {MaterialService.toast(error.error.message); this.form.enable;}
      
      
    );
  }




  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  triggerClick()
  {
    this.inputRef.nativeElement.click();
  }




  // Обрабатываем загрузку картинок
  onFileUpload(event: any)
  {
    const file = event.target.files['0'];
    this.image = file;

    

    // Подключаем ридер для считывания картинки
    const reader = new FileReader();


    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {

      // Переменная для хранения информации об изображении
      this.imagePreview = reader.result;
    };


    // Читаем нужный нам файл
      reader.readAsDataURL(file);

    
  }

}
