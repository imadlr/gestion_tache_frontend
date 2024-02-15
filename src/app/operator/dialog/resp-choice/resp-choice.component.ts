import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResponsibleDTO} from "../../../models/responsible";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponsibleService} from "../../../services/responsible.service";

@Component({
  selector: 'app-resp-choice',
  templateUrl: './resp-choice.component.html',
  styleUrls: ['./resp-choice.component.css']
})
export class RespChoiceComponent implements OnInit {

  @Output()
  responsibleChange = new EventEmitter<number>();
  responsibleForm !: FormGroup;
  responsibles: ResponsibleDTO[] = [];

  constructor(private fb: FormBuilder,
              private respService: ResponsibleService) {
  }

  ngOnInit(): void {
    this.responsibleForm = this.fb.group({
      responsibleId: [null, Validators.required]
    })
    this.getResponsibles();
  }

  private getResponsibles() {
    this.respService.getResponsibles().subscribe(
      (data: any) => {
        this.responsibles = data
      }, (err) => {
        console.log(err)
      }
    )
  }

  handleSubmit() {
    this.responsibleChange.emit(this.responsibleForm.value.responsibleId);
  }

}
