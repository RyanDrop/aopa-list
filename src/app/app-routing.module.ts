import { NgModule } from '@angular/core';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: async () =>
      (await import('./domain/home/home.domain.module')).HomeDomainModule,
  },
  {
    ...canActivate(redirectLoggedInToHome),
    path: 'auth',
    loadChildren: async () =>
      (await import('./domain/auth/auth.domain.module')).AuthDomainModule,
  },
  {
    path: 'todo',
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: async () =>
      (await import('./domain/todo/todo.domain.module')).TodoListDomainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
