import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DivisionService} from "../../../services/division.service";

@Component({
  selector: 'app-division-dialog',
  templateUrl: './division-dialog.component.html',
  styleUrls: ['./division-dialog.component.css']
})
export class DivisionDialogComponent implements OnInit {

  dialogAction: string = 'Ajouter';
  action: string = 'add';
  divisionForm!: FormGroup;

  onAddAction = new EventEmitter()
  onEditAction = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private dialogRef: MatDialogRef<DivisionDialogComponent>,
              private divisionService: DivisionService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.divisionForm = this.fb.group({
      nameDivision: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      cni: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
    })

    if (this.dialogData.action == 'update') {
      this.dialogAction = 'Modifier';
      this.action = 'update';
      this.divisionForm.patchValue(this.dialogData.data);
      this.divisionForm.controls['username'].setValue(this.dialogData.data.userAccountDTO.username);
      this.divisionForm.controls['password'].setValue(this.dialogData.data.userAccountDTO.password);
    }

  }

  handleSubmit() {
    if (this.action == 'add') {
      this.add();
    } else {
      this.edit();
    }
  }

  private add() {
    const division: any = {
      nameDivision: this.divisionForm.value.nameDivision,
      firstName: this.divisionForm.value.firstName,
      lastName: this.divisionForm.value.lastName,
      cni: this.divisionForm.value.cni,
      userAccountDTO: {
        username: this.divisionForm.value.username,
        password: this.divisionForm.value.password
      }
    }
    this.divisionService.saveDivision(division).subscribe(() => {
      this.dialogRef.close();
      this.onAddAction.emit()
    }, (err) => {
      console.log(err)
    })

  }

  private edit() {
    const division: any = {
      id: this.dialogData.data.id,
      nameDivision: this.divisionForm.value.nameDivision,
      firstName: this.divisionForm.value.firstName,
      lastName: this.divisionForm.value.lastName,
      cni: this.divisionForm.value.cni,
      userAccountDTO: {
        id: this.dialogData.data.userAccountDTO.id,
        username: this.divisionForm.value.username,
        password: this.divisionForm.value.password
      }
    }
    this.divisionService.updateDivision(division).subscribe(() => {
      this.dialogRef.close();
      this.onEditAction.emit()
    }, (err) => {
      console.log(err)
    })
  }

}
