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