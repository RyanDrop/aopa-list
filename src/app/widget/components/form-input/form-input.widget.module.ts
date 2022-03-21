import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ShowValidationErrorDirectiveWidgetModule } from 'app/widget/directives/show-validation-error/show-validation-error.widget.module';
import { FormInput } from './form-input.component';

@NgModule({
  declarations: [FormInput],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ShowValidationErrorDirectiveWidgetModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [FormInput],
})
export class FormInputWidgetModule {}
