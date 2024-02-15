import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SecretaryDTO} from "../models/secretary";

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {

  url = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  getSecretariesByCni(keyword: string) {
    return this.http.get(this.url + "/admin/secretaries?keyword=" + keyword)
  }

  saveSecretary(secretary: SecretaryDTO) {
    return this.http.post(this.url + "/admin/saveSecretary", secretary)
  }

  updateSecretary(secretary: SecretaryDTO) {
    return this.http.put(this.url + "/admin/updateSecretary", secretary)
  }

  deleteSecretary(id: number) {
    return this.http.delete(this.url + "/admin/deleteSecretary/" + id)
  }
}
