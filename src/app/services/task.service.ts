import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  getCurrentTasksByDivision(divisionId: number, keyword: string) {
    return this.http.get(this.url + "/division/currentTasks/" + divisionId + "?keyword="
      + keyword);
  }

  getCompletedTasksByDivision(divisionId: number, keyword: string) {
    return this.http.get(this.url + "/division/completedTasks/" + divisionId + "?keyword="
      + keyword);
  }

  getLateTasksByDivision(divisionId: number, keyword: string) {
    return this.http.get(this.url + "/division/lateTasks/" + divisionId + "?keyword="
      + keyword);
  }

  fishTask(taskId: number) {
    return this.http.put(this.url + "/division/finishedTask", {
      "taskId": taskId
    }, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

}
