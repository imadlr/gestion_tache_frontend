import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

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
    this.authService.loadUser()?.subscribe(data => {
      this.division = data
    }, err => {
      console.log(err.error.message)
    })
  }

}
