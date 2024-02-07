import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  url = 'http://localhost:8080'

  constructor(private http: HttpClient) {
  }

}
