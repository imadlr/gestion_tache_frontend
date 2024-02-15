import {Component, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-late-tasks-resp',
  templateUrl: './late-tasks-resp.component.html',
  styleUrls: ['./late-tasks-resp.component.css']
})
export class LateTasksRespComponent implements OnInit {

  tasks: TaskDTO[] = [];
  keyword: string = ''
  p: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getLateTasks();
  }

  getLateTasks() {
    this.taskService.getLateTasks(this.keyword).subscribe((data: any) => {
      this.tasks = data;
    }, (err) => {
      console.log(err)
    })
  }

  search() {
    this.getLateTasks();
  }

}

