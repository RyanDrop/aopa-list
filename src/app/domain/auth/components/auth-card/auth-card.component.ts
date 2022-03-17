import { Component, Input } from '@angular/core';

@Component({
  selector: 'aopa-auth-card',
  templateUrl: './auth-card.component.html',
  styleUrls: ['./auth-card.component.scss'],
})
export class AuthCardComponent {
  @Input() displayNone: boolean;
  @Input() area: Object;
}
