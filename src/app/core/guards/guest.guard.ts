// guest.guard.ts
import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {map, of} from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    return authService.getUserInfo().pipe(
      map(() => {
        router.navigate(['']);
        return false;
      })
    );
  } else {
    return of(true);
  }
};
