import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { Project } from 'app/shared/services/projects/projects.service.models';
import { from, Observable, timer } from 'rxjs';
import { CreateProjectDialogComponent } from '../../components/create-project-dialog/create-project-dialog.component';
import { UpdateProfileImageDialogComponent } from '../../components/update-profile-image-dialog/update-profile-image-dialog.component';



@UntilDestroy()
@Component({
  selector: 'aopa-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private readonly firebase: FirebaseService, private dialog: MatDialog, private projectsService: ProjectsService
  ) { }

  name: string;
  occupation: string;
  profileImage: string | null
  loading = false
  projects$: Observable<Project[]>

  openCreateProjectDialog(): void {
    this.dialog.open(CreateProjectDialogComponent);
  }

  openUpdateImageDialog() {
    const dialogRef = this.dialog.open(UpdateProfileImageDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (!value) return
      this.loading = true
      timer(3000).subscribe(() => this.reloadImage())
    }
    );
  }

  ngOnInit() {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(aopa => {
      this.name = aopa.user.name
      this.occupation = aopa.user.occupation
      this.profileImage = aopa.firebaseUser!.photoURL
      if (aopa.user.darkThemePreference) {
        document.documentElement.classList.add('dark-mode')
      }
    })

    this.projects$ = this.projectsService.getProjects()
  }



  reloadImage() {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(aopa => {
      aopa.firebaseUser!.reload().then(() => {
        this.loading = false
        this.profileImage = aopa.firebaseUser!.photoURL
      }
      )
    }
    )
  }
}
