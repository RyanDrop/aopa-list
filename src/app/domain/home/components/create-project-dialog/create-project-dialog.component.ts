import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DateFnsService } from 'app/shared/services/date-fns/date-fns.service';
import { ProjectsService } from 'app/shared/services/projects/projects.service';
import { CreateProject } from 'app/shared/services/projects/projects.service.models';

@Component({
  selector: 'aopa-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {

  firstGroupCreateProject: FormGroup
  secondGroupCreateProject: FormGroup

  constructor(private dateFns: DateFnsService, private projects: ProjectsService) { }

  readonly START_DATE = new Date();
  readonly icons = ['favorite', 'work', 'assignment_ind', 'alarm', 'sports_esports', 'luggage']

  ngOnInit(): void {
    this.creatForm();
  }

  creatForm() {
    this.firstGroupCreateProject = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      projectGoal: new FormControl(null, [
        Validators.required,
      ]),
    });

    this.secondGroupCreateProject = new FormGroup({
      projectEndDate: new FormControl(null, [
        Validators.required,
      ]),
      projectColor: new FormControl(null, [
        Validators.required,
      ]),
      projectIcon: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  matcher = new ErrorStateMatcher();

  get projectName() {
    return this.firstGroupCreateProject.controls.projectName as FormControl;

  }

  get projectGoal() {
    return this.firstGroupCreateProject.controls.projectGoal as FormControl;
  }

  get projectEndDate() {
    return this.secondGroupCreateProject.controls.projectEndDate as FormControl;
  }


  get projectColor() {
    return this.secondGroupCreateProject.controls.projectColor as FormControl;
  }

  get projectIcon() {
    return this.secondGroupCreateProject.controls.projectIcon as FormControl;
  }

  submitForm() {
    const data = this.dateFns.formatDate(this.projectEndDate.value, 'yyyy-MM-dd')

    const project: CreateProject = {
      name: this.projectName.value,
      goal: this.projectGoal.value,
      endDate: data,
      icon: this.projectIcon.value,
      color: this.projectColor.value,
    }
    this.projects.addProject(project)
  }
}

