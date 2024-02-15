import {UserAccountDTO} from "./user-account";

export interface AdminDTO {
  id: number;
  firstName: string;
  lastName: string;
  cni: string;
  userAccountDTO: UserAccountDTO;
}

