export enum AgendaState {
  TERMINEE = 'TERMINEE',
  EN_ATTENTE = 'EN_ATTENTE'
}


export interface AgendaDTO {
  id: number;
  object: string;
  date: Date;
  hour: any;
  observation: string;
  state: AgendaState;
  idResponsible: number;
}
