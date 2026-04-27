import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent) },
  { path: 'tour/:tourId', loadComponent: () => import('./features/tour-details/tour-details').then(m => m.TourDetailsComponent) },
  { path: 'archive', loadComponent: () => import('./features/archive/archive').then(m => m.ArchiveComponent) },
  { path: 'destinations', loadComponent: () => import('./features/destinations/destinations').then(m => m.DestinationsComponent) },
  { path: 'auth/login', loadComponent: () => import('./features/auth/login').then(m => m.LoginComponent) },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) },
  { path: 'about', loadComponent: () => import('./features/info/info').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/info/info').then(m => m.ContactComponent) },
  { path: '**', redirectTo: '' }
];
