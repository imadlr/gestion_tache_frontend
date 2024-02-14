import {Component, EventEmitter, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DivisionDTO} from "../../../models/division";
import {DivisionService} from "../../../services/division.service";
import {TaskService} from "../../../services/task.service";
import {TaskState} from "../../../models/task";

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  onAddTask = new EventEmitter();
  onEditTask = new EventEmitter();
  taskForm: any = FormGroup;
  dialogAction: any = 'Ajouter';
  action: any = 'add';

  divisions: DivisionDTO[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<TaskDialogComponent>,
              private divisionService: DivisionService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      object: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      state: [null, [Validators.required]],
      divisionId: [null, [Validators.required]]
    });

    if (this.dialogData.action == 'update') {
      this.dialogAction = 'Modifier';
      this.action = 'update';
      this.taskForm.patchValue(this.dialogData.data);
    }

    this.getDivisions();
  }

  getDivisions() {
    this.divisionService.getDivisions().subscribe((data: any) => {
      this.divisions = data
    }, (err) => {
      console.log(err)
    })
  }

  handleSubmit() {
    if (this.action == 'update') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    var data = this.taskForm.value;
    this.taskService.saveTask(data).subscribe((data: any) => {
      this.dialogRef.close()
      this.onAddTask.emit();
    }, (err) => {
      console.log(err);
    });
  }

  edit() {
    var data = this.taskForm.value;
    data['id'] = this.dialogData.data.id;

    this.taskService.updateTask(data).subscribe((resp: any) => {
      this.dialogRef.close();
      this.onEditTask.emit();
    }, (err) => {
      console.log(err);
    });
  }

  protected readonly TaskState = TaskState;
  protected readonly Object = Object;

}
