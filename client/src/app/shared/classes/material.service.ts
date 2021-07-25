// Сервис для работы с materialyze.css

// Декларируем переменную "m", что бы избежать ошибок
declare var M: { toast: (arg0: { html: string; }) => void; };


export class MaterialService
{
    static toast(message: string)
    {
        // Метод описан в документации js фреймворка materialyze
        M.toast({html: message})
    }
}