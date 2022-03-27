import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditInPlaceComponent } from 'app/domain/home/components/edit-in-place/edit-in-place.component';
import { ViewInputComponent } from 'app/domain/home/components/view-input/view-input.component';
import { FormInputWidgetModule } from 'app/widget/components/form-input/form-input.widget.module';
import { HeaderWidgetModule } from 'app/widget/components/header/header.widget.module';
import { ShowValidationErrorDirectiveWidgetModule } from 'app/widget/directives/show-validation-error/show-validation-error.widget.module';
import { NgxColorsModule } from 'ngx-colors';
import { CreateProjectDialogComponent } from './components/create-project-dialog/create-project-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { SelectListModeComponent } from './components/select-list-mode/select-list-mode.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomePage } from './pages/home/home.page';
import { SettingsPage } from './pages/settings/settings.page';

@NgModule({
  declarations: [
    HomeComponent,
    HomePage,
    SelectListModeComponent,
    SettingsPage,
    EditInPlaceComponent,
    ViewInputComponent,
    LoginDialogComponent,
    CreateProjectDialogComponent,
    ProjectCardComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderWidgetModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    FormInputWidgetModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ShowValidationErrorDirectiveWidgetModule,
    NgxColorsModule
  ],
})
export class HomeDomainModule { }
