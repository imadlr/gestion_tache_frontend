import {Component, Input, OnInit} from '@angular/core';
import {ResponsibleDTO} from "../../models/responsible";
import {CountTaskByStateDTO} from "../../models/taskByState";
import {TaskService} from "../../services/task.service";
import {TaskState} from "../../models/task";

@Component({
  selector: 'app-home-resp',
  templateUrl: './home-resp.component.html',
  styleUrls: ['./home-resp.component.css']
})
export class HomeRespComponent implements OnInit {

  @Input()
  responsible !: ResponsibleDTO;
  statistics: CountTaskByStateDTO[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.getStatistics()
  }

  getStatistics() {
    this.taskService.getStatistics().subscribe((data: any) => {
      this.statistics = data
    }, (err) => {
      console.log(err)
    })
  }

  getTotalCount(): number {
    return this.statistics.reduce((total, stats) => total + stats.count, 0);
  }

}
