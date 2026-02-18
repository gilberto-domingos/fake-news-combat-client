import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'sigup',
    loadComponent: () => import('./components/sigup/sigup').then((m) => m.Sigup),
  },
  {
    path: 'sigin',
    loadComponent: () => import('./components/sigin/sigin').then((m) => m.Sigin),
  },
  {
    path: 'conditions',
    loadComponent: () =>
      import('./components/termsconditions/termsconditions').then((m) => m.Termsconditions),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./components/privacynotice/privacynotice').then((m) => m.Privacynotice),
  },
];
