import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FirebaseService } from 'app/shared/services/firebase/firebase.service';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { Project } from 'app/shared/services/projects/projects.service.models';
import { from, Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DialogConfirmActionComponent } from '../../components/dialog-confirm-action/dialog-confirm-action.component';

@UntilDestroy()
@Component({
  selector: 'aopa-projects',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss']
})
export class ProjectPage implements OnInit {
  [x: string]: any;

  project$: Observable<Project>


  constructor(private route: ActivatedRoute, public projectsService: ProjectsService, private firebase: FirebaseService, private dialog: MatDialog) { }

  ngOnInit() {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(aopa => {
      if (aopa.user.darkThemePreference) {
        document.documentElement.classList.add('dark-mode')
      }
    })

    this.route.params
      .pipe(untilDestroyed(this), switchMap((params) => {
        const projects = this.projectsService.getProjects()
        return projects.pipe(
          switchMap((projects) => {
            const project = projects.find((project) => project.id == params.id)
            return project ? of(project) : throwError('Project not found')
          }
          ))
      })
      ).subscribe((project) => {
        this.projectsService.setProject(project)
        this.project$ = of(project)
        this.projectsService.getPercentageTasks()
      })
  }

  openDialog(currentConfirmAction: "project" | "subProject", idOfCurrentConfirmAction: number): void {
    this.dialog.open(DialogConfirmActionComponent, {
      data: {
        currentConfirmAction,
        idOfCurrentConfirmAction,
      },
    });
  }

  addTask(subProjectiD: number, task: string) {
    this.projectsService.addTaskInSubProject(subProjectiD, task)
  }

  addSubProject(subProject: string) {
    this.projectsService.addSubProject(subProject);
  }
}
