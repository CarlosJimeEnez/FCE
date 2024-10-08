import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginUserService } from '../services/login-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _loginService: LoginUserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const token = this._loginService.getToken();
      if (token) {
        console.log('Token: ', token);
        return true;
      } else {
        this.router.navigate(['/admin/login']);
        return false;
      }
  }
}