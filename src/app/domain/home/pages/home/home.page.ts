import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { Project } from 'app/shared/services/projects/projects.service.models';
import { from, Observable } from 'rxjs';
import { CreateProjectDialogComponent } from '../../components/create-project-dialog/create-project-dialog.component';



@UntilDestroy()
@Component({
  selector: 'aopa-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@UntilDestroy()
export class HomePage implements OnInit {

  constructor(private readonly firebase: FirebaseService, private dialog: MatDialog, private projects: ProjectsService
  ) { }

  name: string;
  occupation: string;



  openDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '400px',
    });

    // dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe((result) => {
    //   console.log(result)
    //   // const data = this.dateFns.formatDate(result.projectEndDate, 'yyyy-MM-dd')

    //   // const project = {
    //   //   name: result.name,
    //   //   goal: result.goal,
    //   //   endDate: data,
    //   //   icon: result.icon
    //   // }

    //   // this.firebase.addUserInfo(project)
    // }
    // );
  }

  ngOnInit() {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(user => {
      this.name = user.name
      this.occupation = user.occupation
      if (user.darkThemePreference) {
        document.documentElement.classList.add('dark-mode')
      }
    })

  }

  get projects$(): Observable<Project[]> {
    return this.projects.project$
  }
}
