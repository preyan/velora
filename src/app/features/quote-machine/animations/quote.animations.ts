import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

export const quoteTextAnimation = trigger('quoteText', [
  transition(':enter', [
    style({
      opacity: 0,
      filter: 'blur(8px)',
    }),
    animate(
      '400ms 350ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({
        opacity: 1,
        filter: 'blur(0px)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      style({
        opacity: 0,
        filter: 'blur(8px)',
      })
    ),
  ]),
]);

export const quoteAuthorAnimation = trigger('quoteAuthor', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(8px)',
    }),
    animate(
      '300ms 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({
        opacity: 1,
        transform: 'translateY(0px)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      style({
        opacity: 0,
      })
    ),
  ]),
]);

export const backgroundAnimation = trigger('background', [
  state('cosmic', style({})),
  state('lofi-rain', style({})),
  state('noir', style({})),
  state('dream-neon', style({})),
  transition('* => *', animate('600ms ease-in-out')),
]);
