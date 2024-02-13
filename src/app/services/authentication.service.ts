import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {catchError, throwError} from "rxjs";
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = "http://localhost:8080";
  role!: string;
  username!: string;

  constructor(private http: HttpClient,
              private router: Router,
              private sharedService:SharedService) {
  }

  public login(data: any) {
    return this.http.post(this.url + '/auth/login', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        if (err.status == 401 || err.status == 403) {
          errorMessage = 'Les identifications sont erronées';
        }
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }

  loadUserAccount(token: string) {
    let decodeJWT: any = jwtDecode(token);
    this.username = decodeJWT.sub;
    this.role = decodeJWT.role;
    this.saveToStorage()
  }

  loadUser() {
    this.loadFromStorage();
    if (this.role === 'DIVISION') {
      return this.http.get(this.url + "/division/getByUsername?username=" + this.username);
    } else if (this.role === 'RESPONSIBLE') {
      return this.http.get(this.url + "/resp/getByUsername?username=" + this.username);
    } else if (this.role === 'ADMIN') {
      return this.http.get(this.url + "/admin/getByUsername?username=" + this.username);
    } else if  (this.role === 'SECRETARY') {
      return this.http.get(this.url + "/sec/getByUsername?username=" + this.username);
    } else {
      return null;
    }
  }

  public isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.removeFromStorage();
    this.router.navigate(['/']);
  }

  private saveToStorage() {
    this.sharedService.saveToStorage('username',this.username)
    this.sharedService.saveToStorage('role',this.role)
  }

  private loadFromStorage() {
      this.username = this.sharedService.loadFromStorage('username');
      this.role = this.sharedService.loadFromStorage('role');
  }

  private removeFromStorage() {
    this.sharedService.removeFromStorage('token');
    this.sharedService.removeFromStorage('username');
    this.sharedService.removeFromStorage('role');
    this.sharedService.removeFromStorage('home');
    this.sharedService.removeFromStorage('current');
    this.sharedService.removeFromStorage('completed');
    this.sharedService.removeFromStorage('late');
    this.sharedService.removeFromStorage('agenda');
  }

}
