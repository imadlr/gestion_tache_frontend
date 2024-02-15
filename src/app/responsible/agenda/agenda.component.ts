import {Component, Input, OnInit} from '@angular/core';
import {ResponsibleDTO} from "../../models/responsible";
import {AgendaService} from "../../services/agenda.service";
import {format} from "date-fns";
import {AgendaDTO} from "../../models/agenda";
import {fr} from "date-fns/locale";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input()
  responsible!: ResponsibleDTO;
  agenda: AgendaDTO[] = [];

  jour: string = format(new Date(), 'EEEE', {locale: fr});
  jourSearchForm: any = FormGroup;
  date!: Date;

  constructor(private agendaService: AgendaService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.jourSearchForm = this.fb.group(
      {
        jour: ['']
      }
    )
    this.getAgendaByDay();
  }

  getAgendaByDay() {
    this.agendaService.getAgendaByDay(this.responsible.id, this.jour).subscribe(
      (data: any) => {
        this.agenda = data
      }, (err) => {
        console.log(err)
      })
  }

  searchByDay() {
    this.jour = this.jourSearchForm.value.jour;
    this.getAgendaByDay();
  }

  searchByDate() {
    this.agendaService.getAgendaByDate(this.responsible.id, this.date).subscribe(
      (data: any) => {
        this.agenda = data
      }, (err) => {
        console.log(err)
      })
  }

  finishAgenda(agendaId: number) {
    this.agendaService.finishedAgenda(agendaId).subscribe(() => {
      this.getAgendaByDay();
    }, (err) => {
      console.log(err)
    });

  }
}
