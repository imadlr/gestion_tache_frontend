import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponsibleDTO} from "../models/responsible";

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  getResponsibles() {
    return this.http.get(this.url + "/sec/responsibles")
  }

  getResponsiblesByCni(keyword: string) {
    return this.http.get(this.url + "/admin/responsibles?keyword=" + keyword)
  }

  saveResponsible(responsible: ResponsibleDTO) {
    return this.http.post(this.url + "/admin/saveResponsible", responsible)
  }

  updateResponsible(responsible: ResponsibleDTO) {
    return this.http.put(this.url + "/admin/updateResponsible", responsible)
  }

  deleteResponsible(id: number) {
    return this.http.delete(this.url + "/admin/deleteResponsible/" + id)
  }

}
