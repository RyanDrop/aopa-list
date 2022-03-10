import { animate, style, transition, trigger } from '@angular/animations';

export const FADE_IN_OUT = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0, position: 'absolute', top: 0, width: '100%' }),
    animate(500, style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate(
      500,
      style({ opacity: 0, position: 'absolute', top: 0, width: '100%' })
    ),
  ]),
]);
