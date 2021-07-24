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
        // Устанавливаем дефолтный роут, когда попадаем на страницу layout.
        path: '',
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
    canActivate: [AuthGuard],
    children: [
      
    ]
  },
];

@NgModule({
  // Импортируем модуль для регистрации наших роутов
  imports: [
    RouterModule.forRoot(routes)
  ],
  // Возвращаем модуль уже сконфигурированный с зарегистрированными роутами
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
