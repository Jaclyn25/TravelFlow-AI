import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.HomeComponent), data: { animation: 'Home' } },
  { path: 'tour/:tourId', loadComponent: () => import('./features/tour-details/tour-details').then(m => m.TourDetailsComponent), data: { animation: 'Tour' } },
  { path: 'archive', loadComponent: () => import('./features/archive/archive').then(m => m.ArchiveComponent), data: { animation: 'Archive' } },
  { path: 'explore', redirectTo: 'archive' },
  { path: 'destinations', loadComponent: () => import('./features/destinations/destinations').then(m => m.DestinationsComponent), data: { animation: 'Destinations' } },
  { path: 'auth/login', loadComponent: () => import('./features/auth/login').then(m => m.LoginComponent), data: { animation: 'Login' } },
  { path: 'auth/register', loadComponent: () => import('./features/auth/login').then(m => m.LoginComponent), data: { animation: 'Register' } },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/member').then(m => m.MemberDashboardComponent),
    canActivate: [authGuard],
    data: { animation: 'Dashboard' }
  },
  { path: 'about', loadComponent: () => import('./features/info/info').then(m => m.AboutComponent), data: { animation: 'About' } },
  { path: 'contact', loadComponent: () => import('./features/info/info').then(m => m.ContactComponent), data: { animation: 'Contact' } },
  { path: 'privacy', loadComponent: () => import('./features/info/info').then(m => m.AboutComponent), data: { animation: 'Privacy' } },
  { path: '**', redirectTo: '' }
];
