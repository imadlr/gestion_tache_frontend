import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AgendaDTO} from "../models/agenda";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  getAgendaByDay(responsibleId: number, jour: string) {
    return this.http.get(this.url + "/resp/agendaByDay/" + responsibleId + "?jour=" + jour);
  }

  getAgendaByDate(responsibleId: number, date: Date) {
    return this.http.get(this.url + "/resp/agendaByDate/" + responsibleId + "?date=" + date);
  }

  finishedAgenda(agendaId: number) {
    return this.http.put(this.url + "/resp/finishedAgenda", {'agendaId': agendaId}, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getAgendaByResponsible(responsibleId: number) {
    return this.http.get(this.url + '/sec/agenda/' + responsibleId)
  }

  addAgenda(agenda: AgendaDTO) {
    return this.http.post(this.url + "/sec/saveAgenda", agenda);
  }

  updateAgenda(agenda: AgendaDTO) {
    return this.http.put(this.url + "/sec/updateAgenda", agenda);
  }

  deletAgenda(agendaId: number) {
    return this.http.delete(this.url + "/sec/deleteAgenda/" + agendaId);
  }

  getAgendaByResponsibleAndDate(responsibleId: number, date: Date) {
    return this.http.get(this.url + '/sec/agendaByDate/' + responsibleId + "?date=" + date)
  }

}
