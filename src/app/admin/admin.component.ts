import {Component, OnInit} from '@angular/core';
import {AdminDTO} from "../models/admin";
import {AuthenticationService} from "../services/authentication.service";
import {SharedService} from "../services/shared.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admin!: AdminDTO;

  showDivisions: boolean = true;
  showSecretaries: boolean = false;
  showResponsibles: boolean = false;

  constructor(private authService: AuthenticationService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    if (this.sharedService.loadFromStorage('division') != null) {
      this.loadFromStorage();
    }
    this.getAdmin()
  }

  getAdmin() {
    this.authService.loadUser()?.subscribe((data: any) => {
      this.admin = data
    }, (err) => {
      console.log(err)
    })
  }

  onShowDivisions() {
    this.showDivisions = true;
    this.showSecretaries = false;
    this.showResponsibles = false;
    this.saveToStorage();
  }

  onShowSecretaries() {
    this.showDivisions = false;
    this.showSecretaries = true;
    this.showResponsibles = false;
    this.saveToStorage();
  }

  onShowResponsibles() {
    this.showDivisions = false;
    this.showSecretaries = false;
    this.showResponsibles = true;
    this.saveToStorage();
  }

  handleLogout() {
    this.removeFromStorage();
    this.authService.logout();
  }

  saveToStorage() {
    this.sharedService.saveToStorage('division', this.showDivisions);
    this.sharedService.saveToStorage('secretary', this.showSecretaries);
    this.sharedService.saveToStorage('responsible', this.showResponsibles);
  }

  loadFromStorage() {
    this.showDivisions = this.stringToBoolean(this.sharedService.loadFromStorage('division'));
    this.showResponsibles = this.stringToBoolean(this.sharedService.loadFromStorage('responsible'));
    this.showSecretaries = this.stringToBoolean(this.sharedService.loadFromStorage('secretary'));
  }

  removeFromStorage() {
    this.sharedService.removeFromStorage('division');
    this.sharedService.removeFromStorage('responsible');
    this.sharedService.removeFromStorage('secretary');
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
