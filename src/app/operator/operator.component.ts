import {Component, OnInit} from '@angular/core';
import {SecretaryDTO} from "../models/secretary";
import {AuthenticationService} from "../services/authentication.service";
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  secretary!: SecretaryDTO;
  showCurrentTasks: boolean = false;
  showCompletedTasks: boolean = false;
  showLateTasks: boolean = false;
  showAgenda: boolean = false;

  constructor(private authService: AuthenticationService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    if (this.sharedService.loadFromStorage('home') != null) {
      this.loadFromStorage()
    }
    this.loadSecretary();
  }

  loadSecretary() {
    this.authService.loadUser()?.subscribe((data: any) => {
      this.secretary = data;
    }, (err) => {
      console.log(err)
    })
  }

  onShowLateTasks() {
    this.showCurrentTasks = false;
    this.showCompletedTasks = false;
    this.showLateTasks = true;
    this.showAgenda = false;
    this.saveToStorage();
  }

  onShowCompletedTasks() {
    this.showCurrentTasks = false;
    this.showCompletedTasks = true;
    this.showLateTasks = false;
    this.showAgenda = false;
    this.saveToStorage();
  }

  onShowCurrentTasks() {
    this.showCurrentTasks = true;
    this.showCompletedTasks = false;
    this.showLateTasks = false;
    this.showAgenda = false;
    this.saveToStorage();
  }

  onShowAgenda() {
    this.showCurrentTasks = false;
    this.showCompletedTasks = false;
    this.showLateTasks = false;
    this.showAgenda = true;
    this.saveToStorage();
  }

  handleLogout() {
    this.authService.logout();
  }

  private saveToStorage() {
    localStorage.setItem('current', this.showCurrentTasks.toString())
    localStorage.setItem('completed', this.showCompletedTasks.toString())
    localStorage.setItem('late', this.showLateTasks.toString())
    localStorage.setItem('agenda', this.showAgenda.toString())
  }

  private loadFromStorage() {
    this.showCurrentTasks = this.stringToBoolean(this.sharedService.loadFromStorage('current'));
    this.showCompletedTasks = this.stringToBoolean(this.sharedService.loadFromStorage('completed'));
    this.showLateTasks = this.stringToBoolean(this.sharedService.loadFromStorage('late'));
    this.showAgenda = this.stringToBoolean(this.sharedService.loadFromStorage('agenda'));
  }

  private stringToBoolean(value: string): any {
    switch (value.toLowerCase()) {
      case 'true':
        return true;
      case 'false':
        return false;
    }
  }

}
