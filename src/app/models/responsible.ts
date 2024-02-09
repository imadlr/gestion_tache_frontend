import {UserAccountDTO} from "./user-account";

export interface ResponsibleDTO {
  id: number;
  firstName: string;
  lastName: string;
  cni: string;
  userAccountDTO: UserAccountDTO;
}

