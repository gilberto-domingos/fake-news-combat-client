import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then((m) => m.Register),
  },
  {
    path: 'grid',
    loadComponent: () => import('./components/imgsgrid/imgsgrid').then((m) => m.Imgsgrid),
  },
];
