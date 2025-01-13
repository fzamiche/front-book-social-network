import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {ActivateAccountComponent} from "./pages/activate-account/activate-account.component";
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent

  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'books',
    loadChildren: () => import('./modules/book/book.module').then(module => module.BookModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
