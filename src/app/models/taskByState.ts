import {TaskState} from "./task";

export interface CountTaskByStateDTO {
  state: TaskState;
  count: number;
}
