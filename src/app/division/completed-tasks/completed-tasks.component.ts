import {Component, Input, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-cot-division',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.css']
})
export class CompletedTasksComponent implements OnInit{

  tasks!: TaskDTO[];
  @Input()
  divisionId!: number;
  keyword: string = '';
  p: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getCompletedTasks()
  }

  getCompletedTasks() {
    this.taskService.getCompletedTasksByDivision(this.divisionId,this.keyword).subscribe(
      (data:any)=> {
        this.tasks = data
      },(err) => {
        console.log(err)
      }
    )
  }

}
