import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  url: string = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

  getResponsibles() {
    return this.http.get(this.url+"/sec/responsibles")
  }

}
