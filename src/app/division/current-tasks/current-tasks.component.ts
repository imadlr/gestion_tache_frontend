import {Component, Input, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-ct-division',
  templateUrl: './current-tasks.component.html',
  styleUrls: ['./current-tasks.component.css']
})
export class CurrentTasksComponent implements OnInit {

  tasks!: TaskDTO[];
  @Input()
  divisionId!: number;
  keyword: string = '';
  p: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.getCurrentTasks();
  }

  getCurrentTasks() {
    this.taskService.getCurrentTasksByDivision(this.divisionId, this.keyword).subscribe((data: any) => {
      this.tasks = data;
    }, (err) => {
      console.log(err)
    })
  }

  handleFinishTask(taskId: number) {
    this.taskService.fishTask(taskId).subscribe(() => {
      this.getCurrentTasks();
      window.alert("Tâche terminée, bien enregistrée.")
    }, (err) => {
      console.log(err)
    });
  }

}
