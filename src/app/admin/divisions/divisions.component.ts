import {Component, OnInit} from '@angular/core';
import {DivisionDTO} from "../../models/division";
import {DivisionService} from "../../services/division.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DivisionDialogComponent} from "../dialog/division-dialog/division-dialog.component";

@Component({
  selector: 'app-divisions',
  templateUrl: './divisions.component.html',
  styleUrls: ['./divisions.component.css']
})
export class DivisionsComponent implements OnInit {

  divisions: DivisionDTO[] = [];
  keyword: string = ''
  p: number = 1;

  constructor(private divisionService: DivisionService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getDivisions();
  }

  getDivisions() {
    this.divisionService.getDivisionsByCni(this.keyword).subscribe((data: any) => {
      this.divisions = data
    }, (err) => {
      console.log(err)
    })
  }

  handleSearch() {
    this.getDivisions();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add'
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(DivisionDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    dialogRef.componentInstance.onAddAction.subscribe(() => {
      this.getDivisions();
    })
  }

  handleEditAction(division: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'update',
      data: division
    }
    dialogConfig.width = '600px'
    const dialogRef = this.dialog.open(DivisionDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    })
    dialogRef.componentInstance.onEditAction.subscribe(() => {
      this.getDivisions();
    })
  }

  handleDeleteAction(id: number) {
    this.divisionService.deleteDivision(id).subscribe(() => {
      this.getDivisions();
    }, (err) => {
      console.log(err)
    })
  }

}
