import { Component, Input } from '@angular/core';

@Component({
  selector: 'aopa-select-list-mode',
  templateUrl: './select-list-mode.component.html',
  styleUrls: ['./select-list-mode.component.scss'],
})
export class SelectListModeComponent {
  @Input() router: string;
  @Input() icon: string;
  @Input() listMode: string;
  @Input() listModeStatus: string;
  @Input() backgroundIcon: string;
}
