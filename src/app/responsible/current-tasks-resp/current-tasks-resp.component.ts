import {Component, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-current-tasks-resp',
  templateUrl: './current-tasks-resp.component.html',
  styleUrls: ['./current-tasks-resp.component.css']
})
export class CurrentTasksRespComponent implements OnInit {

  tasks: TaskDTO[] = [];
  keyword: string = ''
  p: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getCurrentTasks();
  }

  getCurrentTasks() {
    this.taskService.getCurrentTasks(this.keyword).subscribe((data: any) => {
      this.tasks = data;
    }, (err) => {
      console.log(err)
    })
  }

  search() {
    this.getCurrentTasks();
  }

}
