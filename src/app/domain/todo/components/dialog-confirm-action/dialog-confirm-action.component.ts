import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectsService } from 'app/shared/services/projects/projects.service';

@Component({
  selector: 'aopa-dialog-confirm-action',
  templateUrl: './dialog-confirm-action.component.html',
  styleUrls: ['./dialog-confirm-action.component.scss']
})
export class DialogConfirmActionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      currentConfirmAction: "project" | "subProject",
      idOfCurrentConfirmAction: number,
    },
    private projectsService: ProjectsService,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }
  onConfirm() {
    if (this.data.currentConfirmAction === "subProject") {
      return this.projectsService.removeSubProject(this.data.idOfCurrentConfirmAction);
    }
    this.projectsService.removeProject(this.data.idOfCurrentConfirmAction);
    this.router.navigate(['/home'])
  }

}
