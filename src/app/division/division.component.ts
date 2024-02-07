import {Component, OnInit} from '@angular/core';
import {DivisionDTO} from "../models/division";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  division!: DivisionDTO;
  showHome: boolean = true;
  showCurrentTasks: boolean = false;
  showCompletedTasks: boolean = false;
  showLateTasks: boolean = false;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('home') !== null) {
      this.loadFromLocalStorage()
    }
    this.loadDivision()
  }

  loadDivision() {
    this.authService.loadUser()?.subscribe((data: any) => {
      this.division = data
    }, (err) => {
      console.log(err)
    })
  }

  onShowHome() {
    this.showHome = true;
    this.showCurrentTasks = false;
    this.showCompletedTasks = false;
    this.showLateTasks = false;
    this.saveToLocalStorage();
  }

  onShowLateTasks() {
    this.showHome = false;
    this.showCurrentTasks = false;
    this.showCompletedTasks = false;
    this.showLateTasks = true;
    this.saveToLocalStorage();
  }

  onShowCompletedTasks() {
    this.showHome = false;
    this.showCurrentTasks = false;
    this.showCompletedTasks = true;
    this.showLateTasks = false;
    this.saveToLocalStorage();
  }

  onShowCurrentTasks() {
    this.showHome = false;
    this.showCurrentTasks = true;
    this.showCompletedTasks = false;
    this.showLateTasks = false;
    this.saveToLocalStorage();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  private loadFromLocalStorage() {
    this.showHome = this.stringToBoolean(localStorage.getItem('home'));
    this.showCurrentTasks = this.stringToBoolean(localStorage.getItem('current'));
    this.showCompletedTasks = this.stringToBoolean(localStorage.getItem('completed'));
    this.showLateTasks = this.stringToBoolean(localStorage.getItem('late'));
  }

  private saveToLocalStorage() {
    this.sharedService.saveToStorage(this.showHome.toString(), this.showCurrentTasks.toString(),
      this.showCompletedTasks.toString(), this.showLateTasks.toString())
  }

  private stringToBoolean(value: any): boolean {
    switch (value.toLowerCase()) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return false;
    }
  }

}
