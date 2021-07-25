import { AuthGuard } from './shared/classes/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';


// Массив наших роутов. Роуты делим на layouts
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        
        path: '',  // Устанавливаем дефолтный роут, когда попадаем на страницу layout.
        redirectTo: '/login',
        pathMatch: 'full' 
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      }
      
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard], //Защищаем роуты которые относяца к самому приложению
    children: [
      
    ]
  },
];

@NgModule({
  
  imports: [
    RouterModule.forRoot(routes)  // Импортируем модуль для регистрации наших роутов
  ],
  
  exports: [
    RouterModule    // Возвращаем модуль уже сконфигурированный с зарегистрированными роутами
  ]
})
export class AppRoutingModule { }
