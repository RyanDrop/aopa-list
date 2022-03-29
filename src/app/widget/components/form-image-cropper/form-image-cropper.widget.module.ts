import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormImageCropperComponent } from './form-image-cropper.component';



@NgModule({
    declarations: [FormImageCropperComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        ImageCropperModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [FormImageCropperComponent],
})
export class FormImageCropperWidgetModule { }