import { ElementRef } from '@angular/core';
import { MaterialInstance } from '../interfaces';
// Сервис для работы с materialyze.css


// Декларируем переменную "m" и необходимые свойста и методы, что бы избежать ошибок
declare var M: {
     toast: (arg0: { html: string; }) => void; 
     FloatingActionButton: any
     init: (arg0: { html: ElementRef; }) => void; 
     updateTextFields: any;
     Modal: any
    };



export class MaterialService
{

    
    // static initModal() {
    //   throw new Error('Method not implemented.');
    // }

    
    static toast(message: string)
    {
        // Метод описан в документации js фреймворка materialyze
        M.toast({html: message})
    }




    // Инициализация динамической кнопки. Принимаем референцию на элемент, типа ElementRef
    static initializeFloatingButton(ref: ElementRef)
    {
       M.FloatingActionButton.init(ref.nativeElement)
    }

    

    // Обновляем текстовые инпуты
    static updateTextInputs()
    {
        M.updateTextFields();
    }



    // Инициализируем модальное окно
    static initModalPos(ref: ElementRef): MaterialInstance
    {
        return M.Modal.init(ref.nativeElement); 
    }
}



