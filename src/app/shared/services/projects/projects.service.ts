import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Project } from 'app/shared/services/projects/projects.service.models';
import { from, Observable, of } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
@UntilDestroy()
export class ProjectsService {

  private projects: Project[] = [];
  project$: Observable<Project[]>

  constructor(private firebase: FirebaseService) {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(aopa => {
      const projects = aopa.user.projects
      this.project$ = of(projects)
    })
  }

  addProject(project: Project) {
    this.projects.push(
      project
    )
    this.project$ = of(this.projects)
    this.firebase.createProject(this.projects)
  }
}
