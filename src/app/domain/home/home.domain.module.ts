import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EditInPlaceComponent } from 'app/domain/home/components/edit-in-place/edit-in-place.component';
import { ViewInputComponent } from 'app/domain/home/components/view-input/view-input.component';
import { FormInputWidgetModule } from 'app/widget/components/form-input/form-input.widget.module';
import { HeaderWidgetModule } from 'app/widget/components/header/header.widget.module';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
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
  ],
})
export class HomeDomainModule {}
