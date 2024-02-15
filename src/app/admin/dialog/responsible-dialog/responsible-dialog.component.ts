import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResponsibleService} from "../../../services/responsible.service";

@Component({
  selector: 'app-responsible-dialog',
  templateUrl: './responsible-dialog.component.html',
  styleUrls: ['./responsible-dialog.component.css']
})
export class ResponsibleDialogComponent implements OnInit {

  dialogAction: string = 'Ajouter';
  action: string = 'add';
  responsibleForm!: FormGroup;

  onAddAction = new EventEmitter()
  onEditAction = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private dialogRef: MatDialogRef<ResponsibleDialogComponent>,
              private respService: ResponsibleService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.responsibleForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      cni: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
    })

    if (this.dialogData.action == 'update') {
      this.dialogAction = 'Modifier';
      this.action = 'update';
      this.responsibleForm.patchValue(this.dialogData.data);
      this.responsibleForm.controls['username'].setValue(this.dialogData.data.userAccountDTO.username);
      this.responsibleForm.controls['password'].setValue(this.dialogData.data.userAccountDTO.password);
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
    const responsible: any = {
      firstName: this.responsibleForm.value.firstName,
      lastName: this.responsibleForm.value.lastName,
      cni: this.responsibleForm.value.cni,
      userAccountDTO: {
        username: this.responsibleForm.value.username,
        password: this.responsibleForm.value.password
      }
    }
    this.respService.saveResponsible(responsible).subscribe(() => {
      this.dialogRef.close();
      this.onAddAction.emit()
    }, (err) => {
      console.log(err)
    })

  }

  private edit() {
    const responsible: any = {
      id: this.dialogData.data.id,
      firstName: this.responsibleForm.value.firstName,
      lastName: this.responsibleForm.value.lastName,
      cni: this.responsibleForm.value.cni,
      userAccountDTO: {
        id: this.dialogData.data.userAccountDTO.id,
        username: this.responsibleForm.value.username,
        password: this.responsibleForm.value.password
      }
    }
    this.respService.updateResponsible(responsible).subscribe(() => {
      this.dialogRef.close();
      this.onEditAction.emit()
    }, (err) => {
      console.log(err)
    })
  }

}
