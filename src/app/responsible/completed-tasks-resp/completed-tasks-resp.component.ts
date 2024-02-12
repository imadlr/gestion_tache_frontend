import {Component, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-completed-tasks-resp',
  templateUrl: './completed-tasks-resp.component.html',
  styleUrls: ['./completed-tasks-resp.component.css']
})
export class CompletedTasksRespComponent implements OnInit {

  tasks: TaskDTO[] = [];
  keyword: string = ''
  p: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getCompletedTasks();
  }

  getCompletedTasks() {
    this.taskService.getCompletedTasks(this.keyword).subscribe((data: any) => {
      this.tasks = data;
    }, (err) => {
      console.log(err)
    })
  }

  search() {
    this.getCompletedTasks();
  }

}

