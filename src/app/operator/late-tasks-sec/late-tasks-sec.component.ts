import {Component, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-late-tasks-sec',
  templateUrl: './late-tasks-sec.component.html',
  styleUrls: ['./late-tasks-sec.component.css']
})
export class LateTasksSecComponent implements OnInit {

  tasks: TaskDTO[] = [];
  keyword: string = '';
  p: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getLateTasks()
  }

  getLateTasks() {
    this.taskService.getLateTasks(this.keyword).subscribe(
      (data: any) => {
        this.tasks = data
      }, (err) => {
        console.log(err)
      }
    )
  }

  handleSearch() {
    this.getLateTasks()
  }

}
