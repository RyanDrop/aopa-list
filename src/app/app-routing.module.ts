import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPage } from '@aopa/pages';
import { AuthGuard } from './domain/auth/guards/auth.guard';
import { HomePage } from './pages/home/home.page';
import { ListPage } from './pages/list/list.page';

const routes: Routes = [
  {
    path: '',

    canLoad: [AuthGuard],
    component: HomePage,
  },
  { path: 'list/:mode', component: ListPage },
  { path: 'settings', component: SettingsPage },
  {
    path: 'auth',
    loadChildren: async () =>
      (await import('./domain/auth/auth.domain.module')).AuthDomainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
