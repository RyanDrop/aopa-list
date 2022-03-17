import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ShowValidationErrorDirective } from 'app/widget/directives/show-validation-error';
import { FormInput } from './../../widget/components/form-input';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { LogInPage } from './pages/log-in/log-in.page';
import { WelcomePage } from './pages/welcome/welcome.page';

@NgModule({
  declarations: [
    AuthComponent,
    AuthCardComponent,
    LogInPage,
    WelcomePage,
    FormInput,
    ShowValidationErrorDirective,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthDomainModule {}
