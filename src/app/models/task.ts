enum TaskState {
  TERMINEE,
  EN_ATTENTE,
  EN_RETARD
}

export interface TaskDTO {
   id: number;
   object: string;
   description: string;
   startDate: Date;
   endDate: Date;
   state: TaskState;
   divisionId: number;
}

