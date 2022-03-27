import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';

@Component({
  selector: 'aopa-update-profile-image-dialog',
  templateUrl: './update-profile-image-dialog.component.html',
  styleUrls: ['./update-profile-image-dialog.component.scss']
})
export class UpdateProfileImageDialogComponent {

  profileImage = new FormControl(null, [
    Validators.required,
  ])
  fileName: string;

  constructor(private changeDetector: ChangeDetectorRef, private firebase: FirebaseService) { }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files: FileList = target.files as FileList;


    if (files && files.length) {
      const file = files[0];
      this.fileName = file.name;
      this.profileImage.setValue(file);
      this.changeDetector.markForCheck();
    }
    console.log(this.profileImage.value)
  }

  sendFile() {
    this.firebase.updateUserProfileImage(this.profileImage.value).subscribe(() => {
      this.profileImage.setValue(null);
      this.fileName = '';

    }
    )
  }

}
