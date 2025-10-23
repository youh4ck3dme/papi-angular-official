import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  // Fix: Explicitly type the injected Router to resolve type inference issues.
  const router: Router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redirect to login page if not authenticated
    router.navigate(['/login']);
    return false;
  }
};
