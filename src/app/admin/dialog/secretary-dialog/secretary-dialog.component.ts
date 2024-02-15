import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SecretaryService} from "../../../services/secretary.service";

@Component({
  selector: 'app-secretary-dialog',
  templateUrl: './secretary-dialog.component.html',
  styleUrls: ['./secretary-dialog.component.css']
})
export class SecretaryDialogComponent implements OnInit {
  dialogAction: string = 'Ajouter';
  action: string = 'add';
  secretaryForm!: FormGroup;

  onAddAction = new EventEmitter()
  onEditAction = new EventEmitter()

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private dialogRef: MatDialogRef<SecretaryDialogComponent>,
              private secService: SecretaryService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.secretaryForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      cni: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
    })

    if (this.dialogData.action == 'update') {
      this.dialogAction = 'Modifier';
      this.action = 'update';
      this.secretaryForm.patchValue(this.dialogData.data);
      this.secretaryForm.controls['username'].setValue(this.dialogData.data.userAccountDTO.username);
      this.secretaryForm.controls['password'].setValue(this.dialogData.data.userAccountDTO.password);
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
    const secretary: any = {
      firstName: this.secretaryForm.value.firstName,
      lastName: this.secretaryForm.value.lastName,
      cni: this.secretaryForm.value.cni,
      userAccountDTO: {
        username: this.secretaryForm.value.username,
        password: this.secretaryForm.value.password
      }
    }
    this.secService.saveSecretary(secretary).subscribe(() => {
      this.dialogRef.close();
      this.onAddAction.emit()
    }, (err) => {
      console.log(err)
    })

  }

  private edit() {
    const secretary: any = {
      id: this.dialogData.data.id,
      firstName: this.secretaryForm.value.firstName,
      lastName: this.secretaryForm.value.lastName,
      cni: this.secretaryForm.value.cni,
      userAccountDTO: {
        id: this.dialogData.data.userAccountDTO.id,
        username: this.secretaryForm.value.username,
        password: this.secretaryForm.value.password
      }
    }
    this.secService.updateSecretary(secretary).subscribe(() => {
      this.dialogRef.close();
      this.onEditAction.emit()
    }, (err) => {
      console.log(err)
    })
  }

}
