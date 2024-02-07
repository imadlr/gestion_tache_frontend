import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = "http://localhost:8080";
  role!: string;
  username!: string;

  constructor(private http: HttpClient,
              private router: Router) {
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
    // if (this.role === 'DIVISION')
      return this.http.get(this.url + "/division/getByUsername?username=" + this.username);

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
    this.removeFromLocalStorage();
  }

  private saveToStorage() {
    localStorage.setItem('username', this.username);
    localStorage.setItem('role', this.role);
  }

  private loadFromStorage() {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedUsername && storedRole) {
      this.username = storedUsername;
      this.role = storedRole;
    }
  }

  private removeFromLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('home');
    localStorage.removeItem('current');
    localStorage.removeItem('completed');
    localStorage.removeItem('late');
  }

}
