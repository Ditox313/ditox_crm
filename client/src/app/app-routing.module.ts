import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';


// Массив наших роутов. Роуты делим на layouts
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '', // Устанавливаем дефолтный роут, когда попадаем на страницу layout.
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard], //Защищаем роуты которые относятся к самому приложению
    children: [
      {
        path: 'overview',
        component: OverviewPageComponent,
      },
      {
        path: 'analytics',
        component: AnalyticsPageComponent,
      },
      {
        path: 'history',
        component: HistoryPageComponent,
      },
      {
        path: 'order',
        component: OrderPageComponent,
        children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent }
        ],
      },
      {
        path: 'categories',
        component: CategoriesPageComponent,
      },
      {
        path: 'categories/new',
        component: CategoriesFormComponent,
      },
      {
        path: 'categories/:id', //Если переходим на конкретную категорию то подгружаеи так же шаблон CategoriesForm
        component: CategoriesFormComponent,
      },
    ],
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
