// Сервис для работы с materialyze.css

import { ElementRef } from "@angular/core";

// Декларируем переменную "m" и необходимые свойста и методы, что бы избежать ошибок
declare var M: {
     toast: (arg0: { html: string; }) => void; 
     FloatingActionButton: any
     init: (arg0: { html: ElementRef; }) => void; 
     updateTextFields: any
    };



export class MaterialService
{
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
}



