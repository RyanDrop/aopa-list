import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderWidgetModule } from 'app/widget/components/header/header.widget.module';
import { ShowValidationErrorDirectiveWidgetModule } from 'app/widget/directives/show-validation-error/show-validation-error.widget.module';
import { DisplayTasksComponent } from './components/display-tasks/display-tasks.component';
import { EditTaskMatDialogComponent } from './components/display-tasks/edit-task-mat-dialog/edit-task-mat-dialog.component';
import { InputTaskComponent } from './components/input-task/input-task.component';
import { TaskProgressComponent } from './components/task-progress/task-progress.component';
import { ListPage } from './pages/list/list.page';
import { ProjectPage } from './pages/project/project.page';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [
    TodoComponent,
    ListPage,
    DisplayTasksComponent,
    InputTaskComponent,
    TaskProgressComponent,
    EditTaskMatDialogComponent,
    ProjectPage,

  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    ShowValidationErrorDirectiveWidgetModule,
    MatProgressBarModule,
    HeaderWidgetModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
  ],
  exports: [],
})
export class TodoListDomainModule { }
