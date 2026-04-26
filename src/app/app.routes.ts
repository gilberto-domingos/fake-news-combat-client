import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./contexts/components/land/land').then((m) => m.Land),
  },
  {
    path: 'land',
    loadComponent: () => import('./contexts/components/land/land').then((m) => m.Land),
  },
  {
    path: 'signup',
    loadComponent: () => import('./contexts/features/auth/signup/signup').then((m) => m.Signup),
  },
  {
    path: 'signin',
    loadComponent: () => import('./contexts/features/auth/signin/signin').then((m) => m.Signin),
  },
  {
    path: 'conditions',
    loadComponent: () =>
      import('./contexts/features/auth/terms-conditions/terms-conditions').then(
        (m) => m.TermsConditions,
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./contexts/features/auth/privacy-notice/privacy-notice').then((m) => m.PrivacyNotice),
  },
];
