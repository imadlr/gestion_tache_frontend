import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SecretaryDTO} from "../../models/secretary";
import {SecretaryService} from "../../services/secretary.service";
import {SecretaryDialogComponent} from "../dialog/secretary-dialog/secretary-dialog.component";

@Component({
  selector: 'app-secretaries',
  templateUrl: './secretaries.component.html',
  styleUrls: ['./secretaries.component.css']
})
export class SecretariesComponent implements OnInit {
  secretaries: SecretaryDTO[] = [];
  keyword: string = ''
  p: number = 1;

  constructor(private secService: SecretaryService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getSecretaries();
  }

  getSecretaries() {
    this.secService.getSecretariesByCni(this.keyword).subscribe((data: any) => {
      this.secretaries = data
    }, (err) => {
      console.log(err)
    })
  }

  handleSearch() {
    this.getSecretaries();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add'
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(SecretaryDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    dialogRef.componentInstance.onAddAction.subscribe(() => {
      this.getSecretaries();
    })
  }

  handleEditAction(secretary: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'update',
      data: secretary
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(SecretaryDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    dialogRef.componentInstance.onEditAction.subscribe(() => {
      this.getSecretaries();
    })
  }

  handleDeleteAction(id: number) {
    this.secService.deleteSecretary(id).subscribe(() => {
      this.getSecretaries();
    }, (err) => {
      console.log(err)
    })
  }

}
