import { NgModule } from '@angular/core';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';
import { environment } from '../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTasksComponent } from './components/display-tasks/display-tasks.component';
import { EditTaskMatDialogComponent } from './components/display-tasks/edit-task-mat-dialog/edit-task-mat-dialog.component';
import { InputTaskComponent } from './components/input-task/input-task.component';
import { TaskProgressComponent } from './components/task-progress/task-progress.component';
import { ShowValidationErrorDirective } from './directives/show-validation-error/show-validation-error.directive';
import { ListPage } from './pages/list/list.page';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { UpperFirstLetterPipe } from './pipes/upper-first-letter/upper-first-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    ShowValidationErrorDirective,
    ListPage,
    TaskProgressComponent,
    InputTaskComponent,
    DisplayTasksComponent,
    EditTaskMatDialogComponent,
    UpperFirstLetterPipe,
    ShowValidationErrorDirective,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatNativeDateModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
    MatProgressBarModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
