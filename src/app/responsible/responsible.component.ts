import {Component, OnInit} from '@angular/core';
import {ResponsibleDTO} from "../models/responsible";
import {AuthenticationService} from "../services/authentication.service";
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.component.html',
  styleUrls: ['./responsible.component.css']
})
export class ResponsibleComponent implements OnInit {

  responsible!: ResponsibleDTO;
  showHome: boolean = true;
  showCurrentTasks: boolean = false;
  showCompletedTasks: boolean = false;
  showLateTasks: boolean = false;


  constructor(private authService: AuthenticationService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    if (this.sharedService.loadFromStorage('home') !== null) {
      this.loadFromStorage()
    }
    this.loadResponsible();
  }

  loadResponsible() {
    this.authService.loadUser().subscribe((data: any) => {
      this.responsible = data;
    }, (err) => {
      console.log(err)
    })
  }

  onShowHome() {
    this.showHome = true;
    this.showCurrentTasks = false;
    this.showCompletedTasks = false;
    this.showLateTasks = false;
    this.saveToStorage();
  }

  onShowLateTasks() {
    this.showHome = false;
    this.showCurrentTasks = false;
    this.showCompletedTasks = false;
    this.showLateTasks = true;
    this.saveToStorage();
  }

  onShowCompletedTasks() {
    this.showHome = false;
    this.showCurrentTasks = false;
    this.showCompletedTasks = true;
    this.showLateTasks = false;
    this.saveToStorage();
  }

  onShowCurrentTasks() {
    this.showHome = false;
    this.showCurrentTasks = true;
    this.showCompletedTasks = false;
    this.showLateTasks = false;
    this.saveToStorage();
  }

  handleLogout() {
    this.authService.logout();
  }

  private saveToStorage() {
    this.sharedService.saveAllToStorage(this.showHome.toString(), this.showCurrentTasks.toString(),
      this.showCompletedTasks.toString(), this.showLateTasks.toString())
  }

  private loadFromStorage() {
    this.showHome = this.stringToBoolean(this.sharedService.loadFromStorage('home'));
    this.showCurrentTasks = this.stringToBoolean(this.sharedService.loadFromStorage('current'));
    this.showCompletedTasks = this.stringToBoolean(this.sharedService.loadFromStorage('completed'));
    this.showLateTasks = this.stringToBoolean(this.sharedService.loadFromStorage('late'));
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
