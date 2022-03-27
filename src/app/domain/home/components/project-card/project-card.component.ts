import { Component, Input } from '@angular/core';

@Component({
  selector: 'aopa-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() icon: string
  @Input() projectName: string
  @Input() endDate: string
}
