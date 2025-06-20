import { Routes } from '@angular/router';
import {LandingComponent} from './pages/landing/landing.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {EventsComponent} from './pages/events/events.component';
import {guestGuard} from './core/guards/guest.guard';
import {CreateEventComponent} from './pages/create-event/create-event.component';
import {authGuard} from './core/guards/auth.guard';
import {MyEventsComponent} from './pages/my-events/my-events.component';
import {WhoWeAreComponent} from './pages/who-we-are/who-we-are.component';

export const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'registro', component: RegisterComponent, canActivate: [guestGuard]},
  { path: 'login', component: LoginComponent, canActivate: [guestGuard]},
  { path: 'eventos', component: EventsComponent},
  { path: 'eventos/crear', component: CreateEventComponent, canActivate: [authGuard]},
  { path: 'mis-eventos', component: MyEventsComponent, canActivate: [authGuard]},
  { path: 'quienes-somos', component: WhoWeAreComponent},
];
