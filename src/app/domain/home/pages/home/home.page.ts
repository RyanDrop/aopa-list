import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take } from 'rxjs/operators';
import { FirebaseService } from './../../../../shared/firebase';

@Component({
  selector: 'aopa-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@UntilDestroy()
export class HomePage implements OnInit {
  name: string;
  occupation: string;
  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.firebase.hasLogin();
    this.firebase.hasUser$
      .pipe(take(1), untilDestroyed(this))
      .subscribe((boolean) => {
        if (boolean) return;
      });
    this.firebase.user$
      .pipe(take(1), untilDestroyed(this))
      .subscribe((details) => {
        this.name = details.user.name;
        this.occupation = details.user.occupation;
      });
  }
}
