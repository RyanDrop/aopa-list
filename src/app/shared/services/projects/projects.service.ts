import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ValuesTaskData } from 'app/shared/firebase';
import { CreateProject, Project } from 'app/shared/services/projects/projects.service.models';
import { from, Observable, of } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';
import { AllKeysData, DataKey } from '../firebase/firebase.service.models';

@Injectable({
  providedIn: 'root'
})
@UntilDestroy()
export class ProjectsService {

  private projectData: {
    currentId: number;
    currentDay: string;
    projects: Project[];
  }

  allProjects$: Observable<Project[]>
  project$: Observable<Project>

  constructor(private firebase: FirebaseService) {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(aopa => {
      this.projectData = aopa.user.projectData
      this.allProjects$ = of(this.projectData.projects)
    })
  }

  addProject(project: CreateProject) {
    this.projectData.projects.push({
      ...project,
      id: this.projectData.currentId,
    }
    )
    this.projectData.currentId++

    this.saveData(AllKeysData.CURRENT_ID, this.projectData.currentId)
    this.saveProjects()
  }

  setProject(id: number) {
    console.log(this.projectData)
    const findProject = this.projectData.projects.find(project => project.id == id)
    if (!findProject) return
    this.project$ = of(findProject)
  }

  saveData(key: AllKeysData, value: ValuesTaskData): void {
    this.firebase.updateDataFields(DataKey.PROJECT_DATA, key, value);
  }

  saveProjects(): void {
    this.firebase.updateDataFields(DataKey.PROJECT_DATA, AllKeysData.PROJECTS, this.projectData.projects)
  }

}
