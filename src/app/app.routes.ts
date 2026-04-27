import { Routes } from '@angular/router';
import { TourDetailsComponent } from './features/tour-details/tour-details';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tour/:tourId', component: TourDetailsComponent }
];
