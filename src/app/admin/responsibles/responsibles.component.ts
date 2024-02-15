import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ResponsibleDTO} from "../../models/responsible";
import {ResponsibleService} from "../../services/responsible.service";
import {ResponsibleDialogComponent} from "../dialog/responsible-dialog/responsible-dialog.component";

@Component({
  selector: 'app-responsibles',
  templateUrl: './responsibles.component.html',
  styleUrls: ['./responsibles.component.css']
})
export class ResponsiblesComponent implements OnInit {

  responsibles: ResponsibleDTO[] = [];
  keyword: string = ''
  p: number = 1;

  constructor(private respService: ResponsibleService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getResponsibles();
  }

  getResponsibles() {
    this.respService.getResponsiblesByCni(this.keyword).subscribe((data: any) => {
      this.responsibles = data
    }, (err) => {
      console.log(err)
    })
  }

  handleSearch() {
    this.getResponsibles();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add'
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(ResponsibleDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    dialogRef.componentInstance.onAddAction.subscribe(() => {
      this.getResponsibles();
    })
  }

  handleEditAction(responsible: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'update',
      data: responsible
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(ResponsibleDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    dialogRef.componentInstance.onEditAction.subscribe(() => {
      this.getResponsibles();
    })
  }

  handleDeleteAction(id: number) {
    this.respService.deleteResponsible(id).subscribe(() => {
      this.getResponsibles();
    }, (err) => {
      console.log(err)
    })
  }

}
