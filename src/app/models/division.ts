import {UserAccountDTO} from "./user-account";

export interface DivisionDTO {
  id: number;
  nameDivision: string;
  firstName: string;
  lastName: string;
  cni: string;
  userAccountDTO: UserAccountDTO;
}
