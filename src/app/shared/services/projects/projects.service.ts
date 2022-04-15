import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ValuesTaskData } from 'app/shared/firebase';
import { CreateProject, Project } from 'app/shared/services/projects/projects.service.models';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  private project: Project

  allProjects$: Observable<Project[]>
  project$: Observable<Project>
  projectPercentage$$ = new BehaviorSubject<number>(0);


  constructor(private firebase: FirebaseService) { }

  getProjects() {
    const aopaUser = from(this.firebase.getUser())
    return aopaUser.pipe(untilDestroyed(this), switchMap((aopa) => {
      this.projectData = aopa.user.projectData
      return this.allProjects$ = of(this.projectData.projects)
    }))
  }

  addProject(project: CreateProject) {
    console.log(project)
    this.projectData.projects.push({
      ...project,
      id: this.projectData.currentId,
      projects: []
    }
    )
    this.projectData.currentId++

    this.saveData(AllKeysData.CURRENT_ID, this.projectData.currentId)
    this.saveProjects()
  }

  removeProject(projectId: number) {
    this.projectData.projects = this.projectData.projects.filter(project => project.id !== projectId)
    this.saveProjects()
  }

  setProject(findProject: Project) {
    this.project = findProject
    this.project$ = of(findProject)
  }


  addSubProject(subProject: string) {
    this.project.projects.push({
      name: subProject,
      id: this.projectData.currentId,
      tasks: []
    })
    this.projectData.currentId++
    this.saveData(AllKeysData.CURRENT_ID, this.projectData.currentId)
    this.project$ = of(this.project)
    this.projectData.projects.find(project => {
      if (project.id == this.project.id) {
        project.projects = this.project.projects
      }
    }
    )
    this.saveProjects()
  }

  removeSubProject(subProjectId: number) {
    this.project.projects = this.project.projects.filter(subProject => subProject.id !== subProjectId)
    this.project$ = of(this.project)
    this.projectData.projects.find(project => {
      if (project.id == this.project.id) {
        project.projects = this.project.projects
      }
    }
    )
    this.saveProjects()
    this.saveProjects()
  }

  addTaskInSubProject(subProjectiD: number, task: string) {
    const findSubProject = this.project.projects.find(project => project.id == subProjectiD)
    if (!findSubProject) return
    findSubProject.tasks.push({
      description: task,
      id: this.projectData.currentId,
      status: false
    })
    this.projectData.currentId++
    this.saveData(AllKeysData.CURRENT_ID, this.projectData.currentId)

    this.project$ = of(this.project)
    this.projectData.projects.find(project => {
      if (project.id == this.project.id) {
        project.projects = this.project.projects
      }
    }
    )
    this.saveProjects()
  }

  removeTask(taskId: number, subProjectId: number) {
    const findSubProject = this.project.projects.find(project => project.id === subProjectId)
    if (!findSubProject) return
    const deleteTask = findSubProject.tasks.filter(task => task.id !== taskId)
    findSubProject.tasks = deleteTask
    this.project$ = of(this.project)
    this.projectData.projects.find(project => {
      if (project.id == this.project.id) {
        project.projects = this.project.projects
      }
    }
    )
    this.saveProjects()
  }

  updateDescriptionTask(description: string, taskId: number, subProjectId: number) {
    const findSubProject = this.project.projects.find(project => project.id === subProjectId)
    if (!findSubProject) return
    const findTask = findSubProject.tasks.find(task => task.id === taskId)
    if (!findTask) return
    findTask.description = description
    this.project$ = of(this.project)
    this.projectData.projects.find(project => {
      if (project.id == this.project.id) {
        project.projects = this.project.projects
      }
    }
    )
  }


  getPercentageTasks(): void {
    if (this.project.projects.length === 0) return
    this.saveProjects();
    const completedTasksLength = this.project.projects.reduce((acc, project) => {
      return acc + project.tasks.filter(task => task.status).length
    }, 0)


    const totalTasksLength = this.project.projects.reduce((acc, project) => {
      return acc + project.tasks.length
    }, 0)

    const projectPercentage = Math.round(
      (completedTasksLength / totalTasksLength) * 100
    )
    this.projectPercentage$$.next(projectPercentage);
  }


  saveData(key: AllKeysData, value: ValuesTaskData): void {
    this.firebase.updateDataFields(DataKey.PROJECT_DATA, key, value);
  }

  saveProjects(): void {
    this.firebase.updateDataFields(DataKey.PROJECT_DATA, AllKeysData.PROJECTS, this.projectData.projects)
  }
}
