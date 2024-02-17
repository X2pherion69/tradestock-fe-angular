import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getTokenFromLocalStorage } from 'utils/localStorage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn() {
    const token = getTokenFromLocalStorage();
    // const timeOut = 10 * 1000
    return token;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService {
  constructor(private route: Router, private authService: AuthService) {}
  canActivate() {
    if (!this.authService.isLoggedIn()) {
      this.route.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}

export const AuthGuard: CanActivateFn = () =>
  inject(AuthenticationGuardService).canActivate();
