import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.isAdmin === 1) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
