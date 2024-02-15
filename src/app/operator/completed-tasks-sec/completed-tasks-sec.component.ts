import {Component, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-completed-tasks-sec',
  templateUrl: './completed-tasks-sec.component.html',
  styleUrls: ['./completed-tasks-sec.component.css']
})
export class CompletedTasksSecComponent implements OnInit {

  tasks: TaskDTO[] = [];
  keyword: string = ''
  p: number = 1

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getCompletedTasks()
  }

  getCompletedTasks() {
    this.taskService.getCompletedTasks(this.keyword).subscribe((data: any) => {
      this.tasks = data
    }, (err) => {
      console.log(err)
    })
  }

  handleSearch() {
    this.getCompletedTasks()
  }
}
