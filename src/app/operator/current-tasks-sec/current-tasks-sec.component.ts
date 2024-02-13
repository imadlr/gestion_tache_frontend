import {Component, OnInit} from '@angular/core';
import {TaskDTO} from "../../models/task";
import {TaskService} from "../../services/task.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TaskDialogComponent} from "../dialog/task-dialog/task-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-current-tasks-sec',
  templateUrl: './current-tasks-sec.component.html',
  styleUrls: ['./current-tasks-sec.component.css']
})
export class CurrentTasksSecComponent implements OnInit {

  tasks: TaskDTO[] = [];
  keyword: string = ''
  p: number = 1;

  constructor(private taskService: TaskService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCurrentTasks()
  }

  getCurrentTasks() {
    this.taskService.getCurrentTasks(this.keyword).subscribe(
      (data: any) => {
        this.tasks = data;
      }, (err) => {
        console.log(err)
      }
    )
  }

  handleSearch() {
    this.getCurrentTasks()
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'add'
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(TaskDialogComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddTask.subscribe((resp) => {
      this.getCurrentTasks();
    });
  }

}
