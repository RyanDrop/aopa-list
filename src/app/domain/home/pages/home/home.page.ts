import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FirebaseService } from 'app/shared/services/firebase.service';
import { from } from 'rxjs';


@UntilDestroy()
@Component({
  selector: 'aopa-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
@UntilDestroy()
export class HomePage implements OnInit {

  constructor(private readonly firebase: FirebaseService,
  ) { }

  name: string;
  occupation: string;

  ngOnInit() {
    const aopaUser = from(this.firebase.getUser())
    aopaUser.pipe(untilDestroyed(this)).subscribe(user => {
      this.name = user.name
      this.occupation = user.occupation
      if (user.darkThemePreference) {
        document.documentElement.classList.add('dark-mode')
      }
    })
  }
}
