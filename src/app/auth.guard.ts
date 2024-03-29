import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (next, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.updateLoginStatus();

  if (!authService.isLoggedIn) {
    return router.parseUrl('/login-to-delete-account');
  }
  return true;
};

export const loginGuard: CanActivateFn = (next, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.updateLoginStatus();

  if (authService.isLoggedIn) {
    return router.parseUrl('/delete-account');
  }
  return true;
};
