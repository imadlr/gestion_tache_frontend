import {Component} from '@angular/core';
import {AgendaDTO} from "../../models/agenda";
import {AgendaService} from "../../services/agenda.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgendaDialogComponent} from "../dialog/agenda-dialog/agenda-dialog.component";

@Component({
  selector: 'app-agenda-sec',
  templateUrl: './agenda-sec.component.html',
  styleUrls: ['./agenda-sec.component.css']
})
export class AgendaSecComponent {

  date!: Date;
  agenda: AgendaDTO[] | undefined;
  p: number = 1;
  idResponsible!: number;

  constructor(private agendaService: AgendaService,
              private router: Router,
              private matDialog: MatDialog) {
  }

  getAgendaByResoinsible(value: number) {
    this.idResponsible = value;
    this.agendaService.getAgendaByResponsible(value).subscribe((data: any) => {
      this.agenda = data
    }, (err) => {
      console.log(err)
    })
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add',
      idResponsible: this.idResponsible
    };
    dialogConfig.width = '600px';
    const dialogRef = this.matDialog.open(AgendaDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.componentInstance.onAddAgenda.subscribe(() => {
      this.getAgendaByResoinsible(this.idResponsible);
    });
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'update',
      idResponsible: this.idResponsible,
      data: values
    };
    dialogConfig.width = '600px';
    const dialogRef = this.matDialog.open(AgendaDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.componentInstance.onEditAgenda.subscribe(() => {
      this.getAgendaByResoinsible(this.idResponsible);
    });
  }

  handleDeleteAction(agendaId: number) {
    this.agendaService.deletAgenda(agendaId).subscribe(() => {
      this.getAgendaByResoinsible(this.idResponsible)
    }, (err) => {
      console.log(err)
    })
  }

  handleSearch() {
    this.agendaService.getAgendaByResponsibleAndDate(this.idResponsible, this.date).subscribe((data: any) => {
      this.agenda = data
    }, (err) => {
      console.log(err)
    })
  }

}
