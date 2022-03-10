import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPage } from '@aopa/pages';
import { ListPage } from './pages/list/list.page';

const routes: Routes = [
  { path: 'settings', component: SettingsPage },
  { path: 'list/:mode', component: ListPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
