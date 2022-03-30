import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { Project } from 'app/shared/services/projects/projects.service.models';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aopa-projects',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss']
})
export class ProjectPage implements OnInit {



  constructor(private route: ActivatedRoute, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.route.params
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        const id = params.id
        this.projectsService.setProject(id)
      });
  }

  get project$(): Observable<Project> {
    return this.projectsService.project$
  }

  addTask(subProjectiD: number, task: string) {
    this.projectsService.addTaskInSubProject(subProjectiD, task)
  }

  addSubProject(subProject: string) {
    this.projectsService.addSubProject(subProject)
  }
}
