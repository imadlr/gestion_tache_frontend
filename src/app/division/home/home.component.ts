import {Component, Input, OnInit} from '@angular/core';
import {DivisionDTO} from "../../models/division";

@Component({
  selector: 'app-division-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Input()
  division!: DivisionDTO;

}
