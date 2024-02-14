import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TaskDTO} from "../models/task";

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

  getStatistics() {
    return this.http.get(this.url + "/resp/countByState")
  }

  getCurrentTasks(keyword: string) {
    const role = localStorage.getItem('role')
    if (role == 'DIVISION') {
      return this.http.get(this.url + "/resp/currentTasks?keyword=" + keyword);
    } else {
      return this.http.get(this.url + "/sec/currentTasks?keyword=" + keyword);
    }
  }

  getCompletedTasks(keyword: string) {
    const role = localStorage.getItem('role')
    if (role == 'DIVISION') {
      return this.http.get(this.url + "/resp/completedTasks?keyword=" + keyword);
    } else {
      return this.http.get(this.url + "/sec/completedTasks?keyword=" + keyword);
    }

  }

  getLateTasks(keyword: string) {
    const role = localStorage.getItem('role')
    if (role == 'DIVISION') {
      return this.http.get(this.url + "/resp/lateTasks?keyword=" + keyword);
    } else {
      return this.http.get(this.url + "/sec/lateTasks?keyword=" + keyword);
    }
  }

  saveTask(task : TaskDTO) {
    return this.http.post(this.url+"/sec/saveTask",task)
  }

  updateTask(task : TaskDTO) {
    return this.http.put(this.url+"/sec/updateTask",task)
  }

  deleteTask(taskId:number) {
    return this.http.delete(this.url+"/sec/deleteTask/"+taskId)
  }

}
