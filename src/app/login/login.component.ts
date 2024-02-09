import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  handleLogin() {
    let data = this.loginForm.value;
    this.authService.login(data).subscribe((resp: any) => {
      localStorage.setItem("token", resp.token)
      this.authService.loadUserAccount(resp.token);
      this.navigateTo();
    }, (err) => {
      this.errorMessage = err;
    })
  }

  navigateTo() {
    if(this.authService.role === 'DIVISION') {
      this.router.navigate(['/division'])
    }
    if(this.authService.role === 'RESPONSIBLE') {
      this.router.navigate(['/responsible'])
    }
  }

}
