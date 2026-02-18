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
    path: 'signup',
    loadComponent: () => import('./components/signup/signup').then((m) => m.Signup),
  },
  {
    path: 'sigin',
    loadComponent: () => import('./components/sigin/sigin').then((m) => m.Sigin),
  },
  {
    path: 'external',
    loadComponent: () =>
      import('./components/externallogin/externallogin').then((m) => m.Externallogin),
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
