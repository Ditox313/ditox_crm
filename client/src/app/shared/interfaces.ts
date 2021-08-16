
// Интерфейсы


// Интерфейс для юзера
export interface User
{
    email: string,
    password: string
}


// Интерфейс для категории
export interface Category
{
    name: string,
    imageSrc?: string
    user?: string,
    _id?: string
}



//Интерфейс для сообщения
export interface Message
{
    message: string
}



// Интерфейс для позиций
export interface Position
{
    name: string,
    cost: string,
    category: string,
    user?: string,
    _id?: string 
}



// Интерфейс для материалайза
export interface MaterialInstance
{
    open?(): void
    close?(): void
    destroy?(): void
}