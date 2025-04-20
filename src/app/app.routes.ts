import { Routes } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {EventsComponent} from './pages/events/events.component';
import {guestGuard} from './core/guards/guest.guard';
import {CreateEventComponent} from './pages/events/components/create-event/create-event.component';

export const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'registro', component: RegisterComponent, canActivate: [guestGuard]},
  { path: 'login', component: LoginComponent, canActivate: [guestGuard]},
  { path: 'eventos', component: EventsComponent},
  { path: 'eventos/crear', component: CreateEventComponent},
];
