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
  showCurrentTasks: boolean = true;
  showCompletedTasks: boolean = false;
  showLateTasks: boolean = false;
  showAgenda: boolean = false;

  constructor(private authService: AuthenticationService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    if (this.sharedService.loadFromStorage('current') != null) {
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
    this.removeFromStorage();
    this.authService.logout();
  }

  private saveToStorage() {
    this.sharedService.saveToStorage('current', this.showCurrentTasks);
    this.sharedService.saveToStorage('completed', this.showCompletedTasks);
    this.sharedService.saveToStorage('late', this.showLateTasks);
    this.sharedService.saveToStorage('agenda', this.showAgenda);
  }

  private loadFromStorage() {
    this.showCurrentTasks = this.stringToBoolean(this.sharedService.loadFromStorage('current'));
    this.showCompletedTasks = this.stringToBoolean(this.sharedService.loadFromStorage('completed'));
    this.showLateTasks = this.stringToBoolean(this.sharedService.loadFromStorage('late'));
    this.showAgenda = this.stringToBoolean(this.sharedService.loadFromStorage('agenda'));
  }

  private removeFromStorage() {
    this.sharedService.removeFromStorage('current');
    this.sharedService.removeFromStorage('completed');
    this.sharedService.removeFromStorage('late');
    this.sharedService.removeFromStorage('agenda');
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
