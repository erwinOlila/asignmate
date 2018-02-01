import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor (private auth: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.authState$
      .take(1)
      .map(user => !!user)
      .do(authenticated => {
        if (authenticated) {
          console.log('logged in');
          this.router.navigate(['/profile']);
        } else {
          console.log('logged out');
          this.router.navigate(['/login']);
        }
      });
  }
}
