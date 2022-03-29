import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'aopa-form-image-cropper',
  templateUrl: './form-image-cropper.component.html',
  styleUrls: ['./form-image-cropper.component.scss']
})
export class FormImageCropperComponent {
  @Input() authPage: boolean;
  @Input() fileName: string;
  @Input() profileImageControl = new FormControl(null);

  constructor(private changeDetector: ChangeDetectorRef) { }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files: FileList = target.files as FileList;
    this.imageChangedEvent = event;

    if (files && files.length) {
      const file = files[0];
      this.fileName = file.name;
      this.profileImageControl.setValue(file);
      this.changeDetector.markForCheck();
    }
  }

  imageChangedEvent: Event;
  croppedImage: any;
  showCropper = false;

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    if (this.croppedImage) {
      this.profileImageControl.setValue(base64ToFile(this.croppedImage));
    }

  }
  imageLoaded() {
    this.showCropper = true;
  }
  loadImageFailed() {
    alert('Could not load the image');
  }


}
