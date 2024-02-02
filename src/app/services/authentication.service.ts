import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = "http://localhost:8080";
  isAuthenticated: boolean = false;
  role: string = '';
  username: string = '';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public login(data: any) {
    return this.http.post(this.url + '/auth/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  loadUserAccount(token: string) {
    this.isAuthenticated = true;
    let decodeJWT: any = jwtDecode(token);
    this.username = decodeJWT.sub;
    this.role = decodeJWT.role;
  }

  loadUser() {
    if (this.role === 'DIVISION') {
      return this.http.get(this.url + "/division/getByUsername?username=" + this.username);
    }
    return null;
  }

}
