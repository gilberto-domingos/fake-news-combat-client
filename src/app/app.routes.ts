import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'land',
  },
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
      import('./contexts/components/terms-conditions/terms-conditions').then(
        (m) => m.TermsConditions,
      ),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./contexts/components/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
  },
  {
    path: 'dashboard-main',
    loadComponent: () =>
      import('./contexts/features/dashboard-main/dashboard-main').then((m) => m.DashboardMain),
  },
  {
    path: 'dashboard-owner',
    loadComponent: () => import('./contexts/features/dashboard/dashboard').then((m) => m.Dashboard),
  },

  {
    path: '**',
    redirectTo: 'land',
  },
  // {
  //   path: 'analytics_access',
  //   loadComponent: () =>
  //     import('./core/analytics-access/analytics-access').then((m) => m.AnalyticsAccess),
  // },
  // {
  //   path: 'navbar',
  //   loadComponent: () => import('./shared/ui/navbar/navbar').then((m) => m.Navbar),
  // },
];
