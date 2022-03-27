import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DateFnsService } from 'app/domain/todo/services/date-fns/date-fns.service';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { Project } from 'app/shared/services/projects/projects.service.models';

@Component({
  selector: 'aopa-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  createProject: FormGroup

  constructor(private dateFns: DateFnsService, private projects: ProjectsService) { }

  readonly START_DATE = new Date();
  readonly icons = ['favorite', 'work', 'assignment_ind', 'alarm', 'sports_esports', 'luggage']

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm() {
    this.createProject = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      projectEndDate: new FormControl(null, [
        Validators.required,
      ]),
      projectGoal: new FormControl(null, [
        Validators.required,
      ]),
      projectColor: new FormControl(null, [
        Validators.required,
      ]),
      projectIcon: new FormControl(null, [
        Validators.required,
      ]),
      // projectDescription: new FormControl(null, [
      //   Validators.required,
      //   Validators.maxLength(200),
      // ]),
      // projectType: new FormControl(null, [
      //   Validators.required,
      //   Validators.maxLength(50),
      // ]),
      // projectStartDate: new FormControl(null, [
      //   Validators.required,
      // ]),
      // projectStatus: new FormControl(null, [
      //   Validators.required,
      // ]),
      // projectPriority: new FormControl(null, [
      //   Validators.required,
      // ]),
    });
  }

  matcher = new ErrorStateMatcher();

  get projectName() {
    return this.createProject.controls.projectName as FormControl;

  }

  get projectEndDate() {
    return this.createProject.controls.projectEndDate as FormControl;
  }

  get projectGoal() {
    return this.createProject.controls.projectGoal as FormControl;
  }

  get projectColor() {
    return this.createProject.controls.projectColor as FormControl;
  }

  get projectIcon() {
    return this.createProject.controls.projectIcon as FormControl;
  }

  submitForm() {
    const data = this.dateFns.formatDate(this.projectEndDate.value, 'yyyy-MM-dd')

    const project: Project = {
      name: this.projectName.value,
      goal: this.projectGoal.value,
      endDate: data,
      icon: 'favorite',
      id: 0
    }
    this.projects.addProject(project)
  }
}

