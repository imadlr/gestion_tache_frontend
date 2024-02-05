import {Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    let expectedRoleArray = route.data['expectedRoles'];

    const token: any = localStorage.getItem('token');
    var tokenPayload: any;

    try {
      tokenPayload = jwtDecode(token);
    } catch (err) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }

    let expectedRole = '';

    for (let i = 0; i < expectedRoleArray.length; i++) {
      if (expectedRoleArray[i] == tokenPayload.role) {
        expectedRole = tokenPayload.role;
      }
    }

    if (this.authService.isAuthenticated()) {
      if (tokenPayload.role == expectedRole) {
        return true;
      } else {
        this.router.navigate([this.router.url]);
        return false;
      }
    } else {
      this.router.navigate(['/']);
      localStorage.removeItem('token');
      return false;
    }

  }

}
