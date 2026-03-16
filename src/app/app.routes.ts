import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup/signup').then((m) => m.Signup),
  },
  {
    path: 'signin',
    loadComponent: () => import('./features/auth/signin/signin').then((m) => m.Signin),
  },
  {
    path: 'conditions',
    loadComponent: () =>
      import('./features/auth/terms-conditions/terms-conditions').then((m) => m.TermsConditions),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./features/auth/privacy-notice/privacy-notice').then((m) => m.PrivacyNotice),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/auth/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
  },
  {
    path: 'support',
    loadComponent: () => import('./features/auth/support/support').then((m) => m.Support),
  },
];
