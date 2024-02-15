export enum TaskState {
  TERMINEE = 'TERMINEE',
  EN_ATTENTE = 'EN_ATTENTE',
  EN_RETARD = 'EN_RETARD'
}

export interface TaskDTO {
  id: number;
  object: string;
  description: string;
  startDate: Date;
  endDate: Date;
  state: TaskState;
  nameDivision: string;
  divisionId: number;
}

