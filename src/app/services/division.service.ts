import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DivisionDTO} from "../models/division";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  url = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  getDivisions() {
    return this.http.get(this.url + "/sec/divisions")
  }

  getDivisionsByCni(keyword: string) {
    return this.http.get(this.url + "/admin/divisions?keyword=" + keyword)
  }

  saveDivision(division: DivisionDTO) {
    return this.http.post(this.url + "/admin/saveDivision", division)
  }

  updateDivision(division: DivisionDTO) {
    return this.http.put(this.url + "/admin/updateDivision", division)
  }

  deleteDivision(divisionId: number) {
    return this.http.delete(this.url + "/admin/deleteDivision/" + divisionId)
  }

}
