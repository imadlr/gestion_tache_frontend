import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ResponsibleService} from "../../../services/responsible.service";
import {ResponsibleDTO} from "../../../models/responsible";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AgendaService} from "../../../services/agenda.service";
import {AgendaState} from "../../../models/agenda";

@Component({
  selector: 'app-agenda-dialog',
  templateUrl: './agenda-dialog.component.html',
  styleUrls: ['./agenda-dialog.component.css']
})
export class AgendaDialogComponent implements OnInit {

  dialogAction: string = 'Ajouter';
  action: string = 'add';
  onAddAgenda = new EventEmitter()
  onEditAgenda = new EventEmitter()

  agendaForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              private dialogRef: MatDialogRef<AgendaDialogComponent>,
              private fb: FormBuilder,
              private respService: ResponsibleService,
              private agendaService: AgendaService) {
  }

  ngOnInit(): void {
    this.agendaForm = this.fb.group({
      object: [null, Validators.required],
      date: [null, Validators.required],
      hour: [null, Validators.required],
      observation: [null, Validators.required],
      state: [null, Validators.required]
    })

    if (this.dialogData.action == 'update') {
      this.dialogAction = 'Modifier';
      this.action = 'update';
      this.agendaForm.patchValue(this.dialogData.data)
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
    var data = this.agendaForm.value;
    data['idResponsible'] = this.dialogData.idResponsible;
    this.agendaService.addAgenda(data).subscribe(() => {
      this.onAddAgenda.emit();
      this.dialogRef.close()
    }, (err) => {
      console.log(err)
    })
  }

  private edit() {
    var data = this.agendaForm.value;
    data['id'] = this.dialogData.data.id
    data['idResponsible'] = this.dialogData.idResponsible;
    this.agendaService.updateAgenda(data).subscribe(() => {
      this.onEditAgenda.emit()
      this.dialogRef.close()
    }, (err) => {
      console.log(err)
    })
  }

  protected readonly AgendaState = AgendaState;
  protected readonly Object = Object;

}
