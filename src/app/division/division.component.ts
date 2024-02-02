import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {catchError, throwError} from "rxjs";

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  division: any;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.division = this.authService.loadUser()?.pipe(
      catchError(err => {
        console.log(err.error.message)
        return throwError(err);
      })
    )

    /*this.authService.loadUser()?.subscribe((resp: any) => {
      this.division = resp.divisionDTO;
    }, (err) => {
      console.log(err.error.message())
    })*/
  }

}
