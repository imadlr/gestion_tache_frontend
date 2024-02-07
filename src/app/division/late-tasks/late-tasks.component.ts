import {Component, Input, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-lt-division',
  templateUrl: './late-tasks.component.html',
  styleUrls: ['./late-tasks.component.css']
})
export class LateTasksComponent implements OnInit {

  tasks!: TaskDTO[];
  @Input()
  divisionId!: number;
  keyword: string = '';
  p: number = 1;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getLateTasks()
  }

  getLateTasks() {
    this.taskService.getLateTasksByDivision(this.divisionId, this.keyword).subscribe(
      (data: any) => {
        this.tasks = data;
      }, (err) => {
        console.log(err)
      }
    )
  }

  handleFinishTask(taskId: number) {
    this.taskService.fishTask(taskId).subscribe(() => {
      this.getLateTasks();
      window.alert("Tâche terminée, bien enregistrée.")
    }, (err) => {
      console.log(err)
    });
  }


}
