import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPage } from './pages/list/list.page';
import { ProjectPage } from './pages/project/project.page';

const routes: Routes = [
  {
    path: 'list/:mode',
    component: ListPage,
  },
  {
    path: 'project/:id',
    component: ProjectPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule { }
