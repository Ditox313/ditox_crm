import { Message } from './../../../shared/interfaces';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { PositionsService } from './../../../shared/services/positions.service';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, Position } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  // Принимаем Id категории
  @Input('categoryId') categoryId: string | any;

  // Получаем ноду модального окна
  @ViewChild('modal') modalRef: ElementRef | any;


  // Создаем контейнер для хранения позиций
  positions: Position[] = [];

  // Добавляем лоадер
  loading: boolean = false;

  // Создаем переменную для материалайза
  modal: MaterialInstance | any;


  // Инициализируем форму
  form: FormGroup | any;



  // Проверяем мы добовляем или реактируем позицию
  positionId: string | any = null;





  modalTitle: string = '';





  constructor(private positionsService: PositionsService) { }



  ngOnInit(): void {


    // Инициализируем форму
    this.form  = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
      cost2: new FormControl(1, [Validators.required, Validators.min(1)]),
      cost3: new FormControl(1, [Validators.required, Validators.min(1)]),
      cost4: new FormControl(1, [Validators.required, Validators.min(1)]),
      cost5: new FormControl(1, [Validators.required, Validators.min(1)]),
      dopWash: new FormControl(1, [ Validators.min(1)]),
      dopPetrol: new FormControl(1, [ Validators.min(1)]),
      dopKindPlace: new FormControl(1, [ Validators.min(1)]),
      dopBuster: new FormControl(1, [ Validators.min(1)]),
      dopBattery: new FormControl(1, [ Validators.min(1)]),
      dopAux: new FormControl(1, [ Validators.min(1)]),
      dopVideo: new FormControl(1, [ Validators.min(1)]),
      dopAntiradar: new FormControl(1, [ Validators.min(1)]),
    })



    // Включаем лоадер
    this.loading = true;


    // Получаем список всех позиций
    this.positionsService.fetch(this.categoryId).subscribe((positions) =>{
      this.positions = positions;
    });

    // Выключаем лоадер
    this.loading = false;


  }




  // Срабатывает когда загрузится контент
  ngAfterViewInit(): void
  {
    this.modal =  MaterialService.initModalPos(this.modalRef)
  }




  // Срабатывает при удалении компонента
  ngOnDestroy(): void
  {
    this.modal.destroy();
  }





  // Редактируем выбранную позицию
  onSelectPosition(position: Position): void
  { 
    this.modalTitle = 'Редактировать позицию';
    
    this.positionId = position._id;

    this.form.patchValue({
      name: position.name,
      cost: position.cost,
      cost2: position.cost2,
      cost3: position.cost3,
      cost4: position.cost4,
      cost5: position.cost5,
      dopWash: position.dopWash,
      dopPetrol: position.dopPetrol,
      dopKindPlace: position.dopKindPlace,
      dopBuster: position.dopBuster,
      dopBattery: position.dopBattery,
      dopAux: position.dopAux,
      dopVideo: position.dopVideo,
      dopAntiradar: position.dopAntiradar,
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }






  // Добавляем позицию
  onAddPosition(): void
  {
    this.positionId = null;
    this.modalTitle = 'Добавить позицию';
    
    this.form.patchValue({
      name: null,
      cost: 1,
      cost2: 1,
      cost3: 1,
      cost4: 1,
      cost5: 1,
      dopWash: '',
      dopPetrol: '',
      dopKindPlace: '',
      dopBuster: '',
      dopBattery: '',
      dopAux: '',
      dopVideo: '',
      dopAntiradar: '',

    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }




  // Отмена модального окна при клике на кнопку отметы в модальном окне
  onCancel():void
  {
    this.modal.close();
  }



  // Удалить позицию
  onDeletePosition(event: Event, position: Position): void
  {
    event.stopPropagation();

    const dicision = window.confirm(`Удалить позицию ${position.name}?`);

    if (dicision) {
      this.positionsService.delete(position).subscribe(responce => {
        const idxPos = this.positions.findIndex(pos => pos._id === position._id);
        this.positions.splice(idxPos, 1);
        MaterialService.toast(responce.message);
      }, error => {
        MaterialService.toast(error.error.message);
      })
    }
  }



  // Обрабатываем форму
  onSubmit():void
  {
    this.form.disable();


    // Создаем новую позицию. Берем данные из формы
    const newPosition: Position | any = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      cost2: this.form.value.cost2,
      cost3: this.form.value.cost3,
      cost4: this.form.value.cost4,
      cost5: this.form.value.cost5,
      dopWash: this.form.value.dopWash,
      dopPetrol: this.form.value.dopPetrol,
      dopKindPlace: this.form.value.dopKindPlace,
      dopBuster: this.form.value.dopBuster,
      dopBattery: this.form.value.dopBattery,
      dopAux: this.form.value.dopAux,
      dopVideo: this.form.value.dopVideo,
      dopAntiradar: this.form.value.dopAntiradar,
      category: this.categoryId
    };



    // Если есть id , значит мы редактируем позицию
    if (this.positionId) {
      newPosition._id = this.positionId;  
      this.positionsService.update(newPosition).subscribe(
        (position) => {
          MaterialService.toast('Изменения сохранены');
          const idxPos = this.positions.findIndex(
            (pos) => pos._id === position._id
          );
          this.positions[idxPos] = position;
        },
        (error) => {
          this.form.enable();
          MaterialService.toast(error.erroe.message);
        },
        () => {
          this.modal.close();
          this.form.reset({
            name: '',
            cost: 1,
            cost2: 1,
            cost3: 1,
            cost4: 1,
            cost5: 1,
            dopWash: '',
            dopPetrol: '',
            dopKindPlace: '',
            dopBuster: '',
            dopBattery: '',
            dopAux: '',
            cosdopVideot5: '',
            dopAntiradar: '',

          });
          this.form.enable();
        }
      );
    }
    // Иначе мы добавляем новую позицию
    else {
      this.modalTitle = 'Добавить позицию'
      this.positionsService.create(newPosition).subscribe(
        (position) => {
          MaterialService.toast('Позиция создана');
          this.positions.push(position);
        },
        (error) => {
          this.form.enable();
          MaterialService.toast(error.erroe.message);
        },
        () => {
          this.modal.close();
          this.form.reset({
            name: '',
            cost: 1,
            cost2: 1,
            cost3: 1,
            cost4: 1,
            cost5: 1,
            dopWash: '',
            dopPetrol: '',
            dopKindPlace: '',
            dopBuster: '',
            dopBattery: '',
            dopAux: '',
            dopVideo: '',
            dopAntiradar: '',
          });
          this.form.enable();
        }
      );
    }
  }

 



}
